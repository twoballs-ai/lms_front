import React from "react";
import { Button } from 'antd';

export default function LmsButton({ buttonText, handleClick }) {

    return(<>
    <Button onClick={handleClick}>{buttonText}</Button>
    </>
        
    )
}