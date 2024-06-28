import { DocuFilePrimitive } from '../../../../../../_core/Documents/Domain/Primitives/DocuFilePrimitive';
import { Center, Image } from '@mantine/core';

export function ImageVisualizer({
    docuFile,
}: {
    docuFile: DocuFilePrimitive,
}) {

    return (
        <>
            <Center h='100%'>
                <Image src={docuFile.url} alt={docuFile.name} mah={"100%"}  height={'auto'} width={"100%"}/>
            </Center>
        </>
    );
}
