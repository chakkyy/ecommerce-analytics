// eslint-disable-next-line @typescript-eslint/no-var-requires
const AdmZip = require('adm-zip');

export function unzipFile(buffer) {
  return new Promise((resolve, reject) => {
    try {
      const zip = new AdmZip(buffer);
      const zipEntries = zip.getEntries();
      const entry = zipEntries[0]; // Suponemos que solo hay un archivo en el .zip

      if (!entry) {
        reject(new Error('No se encontró ningún archivo en el .zip'));
        return;
      }

      const unzippedData = entry.getData();
      resolve(unzippedData);
    } catch (error) {
      reject(error);
    }
  });
}
