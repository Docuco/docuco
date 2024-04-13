'use client';

import { Center, Text } from "@mantine/core";
import { useGetDocuFiles } from "../../../documents/_hooks/useGetDocuFiles";
import CountUp from "react-countup";
import classes from './DocuFilesCounter.module.css'

export function DocuFilesCounter() {

    const {docuFiles, isLoading} = useGetDocuFiles();

    const totalFiles = docuFiles.length || 0;

    if (isLoading) {
        return (
            <div className={classes.space}>
            </div>
        )
    }

    return (
        <>
            <Center>
                <Text className={classes.text}>
                    Currently you have&nbsp;
                    <CountUp delay={0} start={0} end={totalFiles} duration={2}>
                        {({ countUpRef }) => {
                            return (
                                <Text variant="gradient" className={classes.text} fw={700} component="span">
                                    <span ref={countUpRef} />
                                </Text>
                            )
                        }}
                    </CountUp>&nbsp;DocuFiles
                </Text>
            </Center>
        </>
    );
}