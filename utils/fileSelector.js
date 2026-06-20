export const getFileObjectForUpload = (fileContent) => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
   
    // Detect file type using magic bytes
    let bytes = [];
    let view = fileContent.byteLength ? new Uint8Array(fileContent.slice(0, 4)) : fileContent;
    for (let i = 0; i < 4; i++) {
        if (typeof view === 'string') {
            bytes.push(view.charCodeAt(i) & 0xFF);
        } else if (view[i] !== undefined) {
            bytes.push(view[i]);
        }
    }
    const hex = bytes.map(b => b.toString(16).padStart(2, '0').toUpperCase()).join('');
   
    let fileExtension = 'png';
    let contentType = 'image/png';
   
    if (hex.startsWith('25504446')) { fileExtension = 'pdf'; contentType = 'application/pdf'; }
    else if (hex.startsWith('89504E47')) { fileExtension = 'png'; contentType = 'image/png'; }
    else if (hex.startsWith('FFD8FF')) { fileExtension = 'jpg'; contentType = 'image/jpeg'; }
    else if (hex.startsWith('47494638')) { fileExtension = 'gif'; contentType = 'image/gif'; }
    else if (hex.startsWith('504B0304')) { fileExtension = 'docx'; contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; }
   
    const randomFilename = `test-file-${timestamp}-${randomNumber}.${fileExtension}`;


    return {
        filename: randomFilename,
        content: fileContent,
        contentType: contentType,
        fileExtension: fileExtension,
        filePath: 'dynamic-binary-data',
    };
};

const getContentType = (fileExtension) => {
    const contentTypeMap = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        pdf: 'application/pdf',
        txt: 'text/plain',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };


    return contentTypeMap[fileExtension.toLowerCase()] || 'application/octet-stream';
};


const pngFileNameList = () => {
    return [
        'SystemCreateError.png',
        'HIPPA78.png',
        'SubFramework_UI_Issue.png',
    ];
};

export const getRandomPngFile = () => {
    const fileList = pngFileNameList();
    const randomIndex = Math.floor(Math.random() * fileList.length);
    const selectedFileName = fileList[randomIndex];
    return selectedFileName;
};


