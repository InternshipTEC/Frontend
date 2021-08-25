import React from 'react'
import { Form } from 'react-bootstrap'
import Text from '../shared/Text'
import Button from '@material-ui/core/Button'
import { MenuItem, Select } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { SignupContext } from './SignupProvider'
import { SET_EMAIL_YANG_DIWAKILKAN, SET_FILE, SET_JUMLAH_ORANG_DIWAKILKAN, SUBMIT } from './reducers'


const ThirdRegisterForm = () => {
    const {metodePembayaran, jumlahOrangDiwakilkan, emailYangDiwakilkan, handleChange} = React.useContext(SignupContext)

    React.useEffect(()=>{
        var form = [];
        for(var i=0;i<jumlahOrangDiwakilkan;i++){
            form.push(emailYangDiwakilkan[i])
        }
        handleChange(SET_EMAIL_YANG_DIWAKILKAN)(form)
    },[jumlahOrangDiwakilkan])

    return (
        <div>
            <Text size={1.75} style={{marginBottom:"1rem"}}>
                Lengkapi data dirimu
            </Text>
            <Text size={1}>
                Lengkapi data diri untuk melakukan finalisasi akunmu.
            </Text>
            <hr/>
            <Form>
                {
                    metodePembayaran !== "Sendiri"
                    &&
                <>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Jumlah orang yang diwakili</Form.Label>
                        <br/>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={jumlahOrangDiwakilkan}
                                onChange={handleChange(SET_JUMLAH_ORANG_DIWAKILKAN)}
                                label="Tipe Pembayaran"
                            >
                            {
                                [1,2,3,4].map(tipe=>
                                    <MenuItem value={tipe} >
                                        {tipe}
                                    </MenuItem>
                                    )
                            }
                            </Select>
                    </Form.Group>
                    {
                        emailYangDiwakilkan.map((_,index)=><>
                            <Form.Group className="mb-3" controlId={index}>
                                <Form.Label>Email terwakili {index+1}</Form.Label>
                                <Form.Control value={emailYangDiwakilkan[parseInt(index)]} onChange={(e)=>{
                                    var tempForm = [...emailYangDiwakilkan];
                                    tempForm[index] = e.target.value;
                                    handleChange(SET_EMAIL_YANG_DIWAKILKAN)(tempForm)
                                }} type="email"/>
                            </Form.Group>
                        </>)
                    }
                </>
                }
               <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Upload bukti pembayaran</Form.Label>
                    <br/>
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        style={{display:"none"}}
                        multiple
                        type="file"
                        onChange={handleChange(SET_FILE)}
                    />
                    <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="default"
                        component="span"
                        startIcon={<CloudUploadIcon/>}
                    >
                        Upload
                    </Button>
                    </label>
                </Form.Group>
            </Form>
            <br/>
            <Button variant="contained" color="primary" onClick={handleChange(SUBMIT)}>Continue</Button>
        </div>
    )
}

export default ThirdRegisterForm
