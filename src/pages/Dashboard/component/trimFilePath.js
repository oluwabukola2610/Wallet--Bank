export function trimFilePath(filePath, maxLength) {
    if (filePath.length <= maxLength) {
      // If the file path is already shorter than or equal to the maxLength, return it as is
      return filePath;
    } else {
      // If the file path is longer than the maxLength, trim it and add an ellipsis (...)
      const ellipsis = '...';
      const fileName = filePath.split('/').pop(); // Get the file name from the path
      const remainingLength = maxLength - ellipsis.length;
      const trimmedFileName =
        fileName.length > remainingLength
          ? fileName.slice(0, remainingLength) + ellipsis
          : fileName;
      return filePath.replace(fileName, trimmedFileName);
    }
  }