interface MockFile {
  name: string;
}

interface MockDirectory {
  name: string;
  contents: (MockDirectory | MockFile)[];
}

class MockFileSystem {
  handle: FileSystemDirectoryHandle;

  constructor(private initialContents: MockDirectory) {
    this.handle = { name: initialContents.name };

    window.showDirectoryPicker = () => Promise.resolve({ name: initialContents.name } as any);
  }
}

export const mockFileSystemAccessApi = (selectDirectoryName: string, initialContents) => {
  window.showDirectoryPicker = () => Promise.resolve({ name: selectDirectoryName } as any);
};
