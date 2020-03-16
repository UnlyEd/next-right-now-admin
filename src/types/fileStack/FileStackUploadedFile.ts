/**
 * Filestack uploaded file
 *
 * @example
 *    filename: "Greenshot 2018-10-08 23.50.04.png"
 *    handle: "cSphm0GARMO8Ph9DuHCK"
 *    mimetype: "image/png"
 *    originalPath: "Greenshot 2018-10-08 23.50.04.png"
 *    size: 579052
 *    source: "local_file_system"
 *    url: "https://cdn.filestackcontent.com/cSphm0GARMO8Ph9DuHCK"
 *    uploadId: "lBW7tkfhqDcK7gp3"
 *    originalFile:
 *      name: "Greenshot 2018-10-08 23.50.04.png"
 *      type: "image/png"
 *      size: 579052
 *    status: "Stored"
 *    key: "sJQPP2ASXquFJZNRaEF7_Greenshot 2018-10-08 23_50_04.png"
 *    container: "gcms-prod-eu-west-1"
 */
export type FileStackUploadedFile = {
  filename: string;
  handle: string;
  mimeType: string;
  originalPath: string;
  size: number;
  source: string;
  url: string;
  uploadId: string;
  originalFile: {
    name: string;
    type: string;
    size: number;
  };
  status: string;
  key: string;
  container: string;
};
