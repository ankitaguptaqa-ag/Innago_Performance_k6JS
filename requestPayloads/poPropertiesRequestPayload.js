import dateUtils from '../utils/dateUtils.js';
import propertiesDataObjects from '../testData/dataObjects/propertiesDataObjects.js';
import randomUtils from '../utils/randomUtils.js';

class PoPropertiesRequestPayload {

    getPropertiesListRequestPayload(options = {}) {
        return JSON.stringify({
            city: options.city || null,
            state: options.state || null,
            zip: options.zip || null,
            statusId: options.statusId || 0,
            noOfUnits: options.noOfUnits || 0,
            hasOpenMaintenances: options.hasOpenMaintenances || false,
            isShowOverdueProperties: options.isShowOverdueProperties || false,
            propertyIds: options.propertyIds || [],
            isArchived: options.isArchived || false,
            retainedPropertyId: options.retainedPropertyId || null,
            sortingOrder: options.sortingOrder || 0,
            sortingColumn: options.sortingColumn || 1,
            pageNumber: options.pageNumber || 1,
            pageSize: options.pageSize || 20,
        });
    }

    

    getPropertyUnitRequestPayload(options = {}) {
        return JSON.stringify({
            PageNumber: options.PageNumber || 0,
            PageSize: options.PageSize || 20,
            IsArchived: options.IsArchived || null,
            PropertyId: options.PropertyId || null,
            UnitId: options.UnitId || null,
            OrganizationId: options.OrganizationId || null,
            SearchText: options.SearchText || '',
            SortOptions: options.SortOptions || { columnName: 'PropertyName', sortOrder: 0 },
            VacancyOptions: options.VacancyOptions || 145,
            IdsToExclude: options.IdsToExclude || [0],
        });
    }

    getAllPropertyInfoRequestPayload(options = {}) {
        return JSON.stringify({
            PropertyName: options.PropertyName || '',
            PageNumber: 1,
            PageSize: options.PageSize || 100,
            StatusId: options.StatusId || 145,
            CityName: options.CityName || '',
            StateName: options.StateName || '',
            ZipCode: options.ZipCode || '',
            HasOpenMaintenances: options.HasOpenMaintenances || false,
            UnitName: options.UnitName || '',
            OverDueProperties: options.OverDueProperties || false,
            UnitId: options.UnitId || 0,
            IsArchived: options.IsArchived || false,
            RetainedPropertyId: options.RetainedPropertyId || 0,
            RetainedTenantId: options.RetainedTenantId || 0,
            SortingOrder: options.SortingOrder || 0,
            SortingColumn: 0,
            IsMaintenanceMSEnable: true,
        });
    }

    updateJsonForValidateTermRequest_m2m(inputRequestJson) {
        let rentFrequencies = [
            {
                DueOnDay: 0,
                MonthofYear: 0,
                Year: 1,
            },
        ];


        inputRequestJson.RentFrequencies = rentFrequencies;
        inputRequestJson.ListingFrequency = 134;
        inputRequestJson.CustomRentFrequencieDates = [];
        inputRequestJson.StartDate = dateUtils.getTodaysDate_yyyy_mm_dd();
        inputRequestJson.EndDate = dateUtils.getFutureDate_yyyy_mm_dd(30);
        return JSON.stringify(inputRequestJson);
    }




    updateSaveLeaseTermRequestJson(payload, propertyObj) {
        let parsedJson = JSON.parse(payload);
        // console.log('Parsed Payload JSON for updateSaveLeaseTermRequestJson :: ', parsedJson);
        let ForecastedInvoices = [];
        for (let i = 1; i <= 12; i++) {
            ForecastedInvoices.push(this.eachInvoice(i, propertyObj.rentAmount));
        }
        parsedJson.DepositAmount = propertyObj.depositAmount;
        parsedJson.Rent = propertyObj.rentAmount;
        parsedJson.DepositDueDate = dateUtils.getTodaysDate_yyyy_mm_dd();
        parsedJson.IsDepositCollected = true;
        parsedJson.FirstRentalDueDate = dateUtils.getFirstDateOfFutureMonth_yyyy_mm_dd(1);
        parsedJson.RentDueOn = 1;
        parsedJson.ForecastedInvoices = ForecastedInvoices;
        return JSON.stringify(parsedJson);
    }

    eachInvoice(iteration, rentAmount) {
        let eachInvoice = propertiesDataObjects.eachInvoice();
        eachInvoice.DueDate = dateUtils.getFirstDateOfFutureMonth_yyyy_mm_dd(iteration);
        eachInvoice.FrequecyDueDate = dateUtils.getFirstDateOfFutureMonth_yyyy_mm_dd(iteration);
        eachInvoice.Rent = rentAmount;
        return eachInvoice;
    }

    addTenantDetailRequestJson(inputRequestJson, tenantRandomDataArray, propertyObject) {
        if (!Array.isArray(inputRequestJson.TenantList) || inputRequestJson.TenantList.length === 0) {
            inputRequestJson.TenantList = [{}];
        }
        const randomPerson = randomUtils.getRandomValueFromArray(tenantRandomDataArray);
        const firstName_1 = randomUtils.capitalizeFirstLetter(randomPerson.first_name);
        const lastName_1 = randomUtils.capitalizeFirstLetter(randomPerson.last_name);
        const emailId = firstName_1.toLowerCase() + '.' + lastName_1.toLowerCase() + '.' + randomUtils.randomPhoneNumber(5) + '_' + '@yopmail.com';
       
        this.tenantData = {
            tenantFirstName_1: firstName_1,
            tenantLastName_1: lastName_1,
            tenantEmail_1: emailId,
            tenantMobileNo_1: randomUtils.randomPhoneNumber(10),
            tenantFullName_1: firstName_1 + ' ' + lastName_1,
            bankUserName: 'mxuser',
            bankPassCode: '123456',
            password: 'Pass@123', ///this why are we using i am not abe to undersatnd that
        };
        inputRequestJson.TenantList[0].Rent = propertyObject.rentAmount;
        inputRequestJson.TenantList[0].Deposit = propertyObject.depositAmount;
        inputRequestJson.TenantList[0].FirstName = this.tenantData.tenantFirstName_1;
        inputRequestJson.TenantList[0].LastName = this.tenantData.tenantLastName_1;
        inputRequestJson.TenantList[0].Email = this.tenantData.tenantEmail_1;
        inputRequestJson.TenantList[0].Phone = {
            AreaCode: this.tenantData.tenantMobileNo_1.substring(0, 3),
            CountryCode: '1',
            Number: this.tenantData.tenantMobileNo_1.substring(3, 10),
            PhoneTypeId: 4,
            Extension: '',
        };
        inputRequestJson.TenantList[0].CurrentPackage = 0;
        inputRequestJson.TenantList[0].TenantScreeningRequired = false; ///i need to chcek from where we are getting this value and why it is false
        inputRequestJson.TenantList[0].ApplicantStatusId = 0;
        inputRequestJson.TenantList[0].isDuplicateEmail = false;
        inputRequestJson.TenantList[0].SelectedPackage = 4;
        inputRequestJson.TenantList[0].PreviousSelectedPackage = 4;
        inputRequestJson.TenantList[0].hasScreeningChangedForNewApplication = false;
        inputRequestJson.TenantList[0].TenantId = inputRequestJson.TenantId;
        inputRequestJson.TenantList[0].UserId = inputRequestJson.UserId;

        return JSON.stringify(inputRequestJson);
    }


    createNewPropertyDetailSchema(newPropertyJson, propertyTagListArray, stateJson, userData, propRandomDataArray) {
        let randomPropertyData = randomUtils.getRandomValueFromArray(propRandomDataArray);
        let residentialItem = propertyTagListArray.find((item) => item.Text === 'Residential');
        let propertyName = randomPropertyData.property_name,
            houseNo = randomPropertyData.house_no,
            addressLine_1 = randomPropertyData.street_address,
            city = randomPropertyData.city,
            zip = randomPropertyData.zip,
            unitName = randomPropertyData.unit_name;
        console.log('Selected random property data :: ', randomPropertyData);
        let propertyTagObject = { Id: residentialItem.Value, Name: residentialItem.Text };
        console.log('Selected Property Tag Object :: ', propertyTagObject);


        newPropertyJson.Name = propertyName;
        newPropertyJson.Address.AddressLine1 = addressLine_1;
        newPropertyJson.Address.City = city;
        newPropertyJson.Address.CityString = city;
        newPropertyJson.Address.StateId = stateJson.Value;
        newPropertyJson.Address.StateName = stateJson.Text;
        newPropertyJson.Address.ZipCode = zip;
        newPropertyJson.Address.ZipString = zip;
        newPropertyJson.TypeId = 14;
        newPropertyJson.OrganizationId = userData.OrganizationId;
        newPropertyJson.IndividualUnits[0].Name = unitName;
        newPropertyJson.IndividualUnits[0].Beds = randomUtils.generateRandomNumber(1);
        newPropertyJson.IndividualUnits[0].Bath = randomUtils.generateRandomNumber(1);
        newPropertyJson.IndividualUnits[0].Area = randomUtils.generateRandomNumber(4);
        newPropertyJson.DefaultUnitTypeId = 354;
        newPropertyJson.IsVerified = true;
        newPropertyJson.PropertyTags[0] = propertyTagObject;
        //console.log('Final newPropertyJson to create property :: ', newPropertyJson);
        return JSON.stringify(newPropertyJson);
    }



    














}


export default new PoPropertiesRequestPayload();
