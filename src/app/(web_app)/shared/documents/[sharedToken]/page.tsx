import { Center, Space, Text } from "@mantine/core";
import { PDFViewer } from "../../../(documents)/documents/_components/PDFViewer/PDFViewer";
import { DocuFilePrimitive } from "../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { API_ROUTES } from "../../../_utils/constants";
import { IconFileOff } from "@tabler/icons-react";

export default async function Page({
  params,
}: {
    params: { sharedToken: string }
}) {
  const res = await fetch(API_ROUTES.GET_DOCUMENT_BY_SHARE_TOKEN(params.sharedToken));
  if (!res.ok) {
    return (
      <>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Center>
          <Text fw={600} size={'2rem'} c='dimmed'>
            Document not found
          </Text>
        </Center>;
        <Center>
          <IconFileOff size={50} color="#9A9A9A" stroke={1.5}/>
        </Center>
      </>
    )
  }
  
  const docuFile: DocuFilePrimitive = await res.json();
  return (
    <html style={{height: '100%', padding: 0, margin: 0}}>
      <body style={{ height: '100%', padding: 0, margin: 0 }}>
        <PDFViewer id='shared-docuFile' docuFile={docuFile}/>
      </body>
    </html>
  );
}
