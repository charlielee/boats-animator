export const blobToRawData = async (blob: Blob): Promise<Uint8Array> => {
  const arrayBuffer = await blob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const saveBlobToDisk = async (filePath: string, blob: Blob): Promise<void> => {
  const rawData = await blobToRawData(blob);
  return window.preload.ipcToMain.saveDataToDisk({ filePath, rawData });
};
