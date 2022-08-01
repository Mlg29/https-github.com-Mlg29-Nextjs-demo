import React, { useMemo, memo, DetailedHTMLProps, HTMLAttributes } from 'react'
import { TextProps } from '../../utils/types';


const Paragraph = memo(
    ({
        text,
        fontSize = '0.9375em',
        lineHeight,
        textTransform ='inherit',
        textAlign='left',
        color = 'white',
        fontFamily = 'Nunito',
        fontWeight = '400',
        margin= "0%",
        ...rest
    }: TextProps) => {

        const propsStyle = useMemo(
            () => ({
                color,
                fontSize,
                textAlign,
                lineHeight,
                fontWeight,
                fontFamily,
                margin,
                textTransform
            }),
            [color, fontWeight, textAlign, lineHeight, fontSize, margin, textTransform],
        );

        return (
            <p
                style={propsStyle}
                {...rest}
            >
                {text}
            </p>
        )
    })


export default Paragraph

