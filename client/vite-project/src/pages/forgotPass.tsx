import React, { useState } from "react";
import LeftPanel from "../components/login/LeftPanel";
import RightPanel from "../components/login/RightPanel";
import Input from "../components/login/Input";
import Button from "../components/login/Button";
import Actions from "../components/login/Actions";
import Card from "../components/login/Card";

export default function ForgotPassword() {
    return(
        
        <Card>
            <LeftPanel>
                
                <Button children="Send code"></Button>
            </LeftPanel>

            <RightPanel title="" description={`Forgot Your password ?  Enter your email and we will send you a code via email.`}/>
            
        </Card>

    )
}