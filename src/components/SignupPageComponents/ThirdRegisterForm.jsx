import { MenuItem, Select } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Text from '../shared/Text'
import { SET_FILE, SET_JUMLAH_ORANG_DIWAKILKAN, SUBMIT } from './reducers'
import { SignupContext } from './SignupProvider'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const ThirdRegisterForm = () => {
    const history = useHistory()
    const {file, mediaPembayaran, pembayar, metodePembayaran, jumlahOrangDiwakilkan, handleChange} = React.useContext(SignupContext)
    const [rekTujuan, setRekTujuan] = React.useState("")
    const [harga, setHarga] = React.useState()
    const [buttonState, setButtonState] = React.useState("Submit")
    const [currentUser] = React.useState(JSON.parse(localStorage.getItem("user")))

    React.useEffect(()=>{
        switch (mediaPembayaran) {
            case "BNI":
                setRekTujuan("0983529604 a.n Ahmad Farkhanudin")
                break;
            case "Gopay":
                setRekTujuan("081387824200 a.n. Nisa Amilia")
                break;
            case "BCA":
                setRekTujuan("0160057602 a.n. Elizabeth Michele S.")
                break;
            case "OVO":
                setRekTujuan("081387824200 a.n. Nisa Amilia")
                break;
            case "Dana":
                setRekTujuan("081387824200 a.n. Nisa Amilia Tabina")
                break;
            case "BRI":
                setRekTujuan("0593-01-018997-50-5 a.n. Daniel Jeans Ricard Silitonga")
                break;
            case "Mandiri":
                setRekTujuan("105-00-1546052-4 a.n. Daniel Jeans Ricard Silitonga")
                break;
            default:
                break;
        }
    },[mediaPembayaran])

    React.useEffect(()=>{
        switch (parseInt(jumlahOrangDiwakilkan)) {
            case 0:
                setHarga(50000)
                break;
            case 1:
                setHarga(90000)
                break;
            case 2:
                setHarga(120000)
                break;
            case 3:
                setHarga(140000)
                break;
            default:
                break;
        }
        if(metodePembayaran === "Sendiri"){
            setHarga(50000)
        }
    },[jumlahOrangDiwakilkan, metodePembayaran])

    return (
        <div>
            <Text size={1.75} style={{marginBottom:"1rem"}}>
                Pembayaran dan pengunggahan file
            </Text>
            {
                   (mediaPembayaran && (pembayar === "Ya" || metodePembayaran === "Sendiri") )
                   ?
                   <>
                    <hr/>
                    <p>Silahkan melakukan pembayaran menuju:</p>
                    <h5>
                        Akun {mediaPembayaran} dengan rekening {rekTujuan}. Dengan nominal Rp{numberWithCommas(harga+currentUser.id)},00 
                    </h5>
                   </>
                   :
                   <>
                    <p>
                        Terimakasih sudah mengisi form! Jangan lupa untuk mengingatkan perwakilan untuk melakukan pembayaran!
                    </p>
                   </>
            }
            {
            (mediaPembayaran && (pembayar === "Ya" || metodePembayaran === "Sendiri") )
            &&
            <Form>
                <br/>
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
                    {
                        file
                        &&
                        <>
                            <br/>
                            <br/>
                            <Text color="green">
                                Bukti pembayaran telah terunggah
                            </Text>
                        </>
                    }
                    </label>
                </Form.Group>
            </Form>
            }
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={()=>{setButtonState("Loading...");handleChange(SUBMIT)(history)}} style={{position:"absolute", bottom:"1rem", width:"97%"}}>{buttonState}</Button>
        </div>
    )
}

export default ThirdRegisterForm
