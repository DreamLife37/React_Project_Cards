import {Card, CardMedia} from "@mui/material";
import React, {FC} from "react";

type MediaCardPropsType = {
    content: string | null
    height?: string
    alt?: string
}

export const MediaCard: FC<MediaCardPropsType> = ({content, height = "50", alt = "alt"}) => {
    return (
        <>
            {
                !!content
                    ?
                    <Card>
                        <CardMedia
                            component='img'
                            src={!!content ? content : undefined}
                            height={height}
                        />
                    </Card>
                    :
                    <></>
            }
        </>

    )
}