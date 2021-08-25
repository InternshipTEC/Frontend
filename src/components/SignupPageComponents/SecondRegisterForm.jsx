import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Form } from 'react-bootstrap';
import Text from '../shared/Text';
import { SET_NAMA_PEMILIK_REKENING, SET_NO_REKENING, SET_JUMLAH_ORANG_DIWAKILKAN, SET_MEDIA_PEMBAYARAN, SET_METODE_PEMBAYARAN, SET_PEMBAYAR, SET_EMAIL_YANG_DIWAKILKAN } from './reducers';
import { SignupContext } from './SignupProvider';
import axios from 'axios';
import { BACKEND_URL } from '../../controller';

const tipePembayaran = [
    "BNI",
    "Gopay",
    "OVO",
    "Dana",
    "BCA",
    "Mandiri"
]

const banyakOrang = [
    "2 Orang (Rp.45.000,00 per orang, total Rp.90.000,00)",
    "3 Orang (Rp.40.000,00 per orang, total Rp.120.000,00)",
    "4 Orang (Rp.40.000,00 per orang, total Rp.160.000,00)",
    "5 Orang (Rp.40.000,00 per orang, total Rp.200.000,00)"
]

const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
        },
    },
};

const SecondRegisterForm = () => {
    const { emailYangDiwakilkan, whichForm, setWhichForm, noRekening, namaPemilikRekening, mediaPembayaran, pembayar, metodePembayaran, jumlahOrangDiwakilkan, handleChange} = React.useContext(SignupContext)
    const [emails, setEmails] = React.useState([])

    React.useEffect(()=>{
        var form = [];
        for(var i=0;i<jumlahOrangDiwakilkan;i++){
            form.push(emailYangDiwakilkan[i])
        }
        handleChange(SET_EMAIL_YANG_DIWAKILKAN)(form)
    },[jumlahOrangDiwakilkan])

    React.useEffect(()=>{
        axios.get(`${BACKEND_URL}/users`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("auth")}`
            }
        })
        .then(res=>res.data)
        .then(data=>setEmails(data.map(x=>x.email)))
        .catch(err=>alert(err.toString()))
    },[])

    return (
        <>
            <Text size={1.75} style={{marginBottom:"1rem"}}>
                Pengisian data registrasi
            </Text>
            <Text size={1}>
                Untuk menjadi intern resmi, kamu diharuskan mengisi data registrasi
            </Text>
            <hr/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Metode Pembayaran</Form.Label>
                    <br/>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={metodePembayaran}
                        onChange={handleChange(SET_METODE_PEMBAYARAN)}
                        label="Tipe Pembayaran"
                    >
                    {
                        ["Sendiri", "Bersama"].map(tipe=>
                            <MenuItem value={tipe} >
                                {tipe}
                            </MenuItem>
                            )
                    }
                    </Select>
                </Form.Group>
                {
                    (((metodePembayaran === "Bersama") && pembayar === "Ya") || metodePembayaran === "Sendiri")
                    &&
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Media Pembayaran</Form.Label>
                            <br/>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={mediaPembayaran}
                                onChange={handleChange(SET_MEDIA_PEMBAYARAN)}
                                label="Tipe Pembayaran"
                            >
                            {
                                tipePembayaran.map(tipe=>
                                    <MenuItem value={tipe} >
                                        {tipe}
                                    </MenuItem>
                                    )
                            }
                            </Select>
                    </Form.Group>
                }
                {
                    (pembayar === "Ya" || metodePembayaran === "Sendiri")
                    &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nama pemilik rekening</Form.Label>
                            <Form.Control type="text" value={namaPemilikRekening} onChange={handleChange(SET_NAMA_PEMILIK_REKENING)} placeholder="Nama Pemilik Rekening" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nomor rekening</Form.Label>
                            <Form.Control type="text" value={noRekening} onChange={handleChange(SET_NO_REKENING)} placeholder="Nomor Rekening" />
                        </Form.Group>
                    </>
                }
                {
                    metodePembayaran === "Bersama" 
                    &&
                    <>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Apakah kamu perwakilan pembayar?</Form.Label>
                        <RadioGroup aria-label="gender" name="pembayar" value={pembayar} onChange={handleChange(SET_PEMBAYAR)}>
                            {
                                ["Ya","Tidak"].map((tipe,index)=>
                                    <FormControlLabel value={tipe} control={<Radio color="primary" />} label={tipe} />
                                    )
                            }
                        </RadioGroup>
                    </Form.Group>
                    {
                        pembayar === "Ya" &&
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Banyak orang dalam pembayaran</Form.Label>
                            <RadioGroup aria-label="gender" name="orang" value={parseInt(jumlahOrangDiwakilkan)} onChange={handleChange(SET_JUMLAH_ORANG_DIWAKILKAN)}>
                                {
                                    banyakOrang.map((tipe,index)=>
                                        <FormControlLabel value={index+1} control={<Radio color="primary" />} label={tipe} />
                                        )
                                }
                            </RadioGroup>

                        </Form.Group>
                    }
                    {
                        (pembayar === "Ya" && metodePembayaran === "Bersama")
                        &&
                        emailYangDiwakilkan.map((_,index)=><>
                            <Form.Group className="mb-3" controlId={index}>
                                <Form.Label>Email terwakili {index+1}</Form.Label>
                                <br/>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={emailYangDiwakilkan[parseInt(index)]}
                                    onChange={(e)=>{
                                        var tempForm = [...emailYangDiwakilkan];
                                        tempForm[index] = e.target.value;
                                        handleChange(SET_EMAIL_YANG_DIWAKILKAN)(tempForm)
                                    }}
                                    MenuProps={MenuProps}
                                    label="Tipe Pembayaran"
                                >
                                {
                                    emails.map(tipe=>
                                        <MenuItem value={tipe} >
                                            {tipe}
                                        </MenuItem>
                                        )
                                }
                                </Select>
                            </Form.Group>
                        </>)
                    }
                    </>
               }
           </Form>
            <br/>
            <Button variant="contained" color="primary" onClick={()=>setWhichForm(whichForm+1)}>Continue</Button>
        </>
    )
}

export default SecondRegisterForm 
