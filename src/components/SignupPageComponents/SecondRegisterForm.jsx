import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Form } from 'react-bootstrap';
import Text from '../shared/Text';
import { SET_NAMA_PEMILIK_REKENING, SET_NO_REKENING, SET_JUMLAH_ORANG_DIWAKILKAN, SET_MEDIA_PEMBAYARAN, SET_METODE_PEMBAYARAN, SET_PEMBAYAR, SET_EMAIL_YANG_DIWAKILKAN } from './reducers';
import { SignupContext } from './SignupProvider';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import { BACKEND_URL } from '../../controller';

const tipePembayaran = [
    "BNI",
    "Gopay",
    "OVO",
    "Dana",
    "BCA",
    "Mandiri",
    "BRI"
]

const banyakOrang = [
    "2 Orang (Rp.45.000,00 per orang, total Rp.90.000,00)",
    "3 Orang (Rp.40.000,00 per orang, total Rp.120.000,00)",
    "4 Orang (Rp.35.000,00 per orang, total Rp.140.000,00)",
]

const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
        },
    },
};

const checkMedia = (text) => {
    if(text === "Gopay" || text === "OVO" || text === "Dana"){
        return false
    }
    return true
}

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
            <Text>
                <br/>
                Contact person line : djrs.sdtel
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
                            <Form.Label>Nama pemilik {checkMedia(mediaPembayaran) ? "rekening" : "no. handphone"}</Form.Label>
                            <Form.Control type="text" value={namaPemilikRekening} onChange={handleChange(SET_NAMA_PEMILIK_REKENING)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nomor {checkMedia(mediaPembayaran) ? "rekening" : "handphone"}</Form.Label>
                            <br/>
                            <Form.Control type="text" value={noRekening} onChange={handleChange(SET_NO_REKENING)} placeholder={`Contoh: ${checkMedia(mediaPembayaran) ? "0593-01-018997-50-5" : "081387824200"}`} />
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
                            <Form.Label>Email terwakilkan {index+1}</Form.Label>
                            <Typeahead
                                onChange={(selected)=>{
                                            var tempForm = [...emailYangDiwakilkan];
                                            tempForm[index] = selected;
                                            handleChange(SET_EMAIL_YANG_DIWAKILKAN)(tempForm)
                                }}
                                options={emails} 
                            />
                            <br/>
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
