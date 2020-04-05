import { FileStackFailedFile } from './FileStackFailedFile';
import { FileStackUploadedFile } from './FileStackUploadedFile';

/**
 * Result provided in onSuccess callback event, once a file has been uploaded to FileStack
 */
export type FileStackResult = {
  filesUploaded: FileStackUploadedFile[];
  filesFailed: FileStackFailedFile[];
}
