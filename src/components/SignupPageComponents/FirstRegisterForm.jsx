import React from 'react'
import { Form } from 'react-bootstrap'
import Text from '../shared/Text'
import Button from '@material-ui/core/Button';
import {SignupContext} from './SignupProvider'
import { SET_FAKULTAS, SET_IDLINE, SET_NAME } from './reducers';

const FirstRegisterForm = () => {
    const {whichForm, setWhichForm, nama,fakultas,idLine,handleChange} = React.useContext(SignupContext)

    return (
        <>
            <Text size={1.75} style={{marginBottom:"1rem"}}>
                Lengkapi data dirimu
            </Text>
            <Text size={1}>
                Lengkapi data diri untuk melakukan finalisasi akunmu.
            </Text>
            <hr/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control type="text" value={nama} onChange={handleChange(SET_NAME)} placeholder="Nama Lengkap" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Fakultas</Form.Label>
                    <Form.Control type="text" value={fakultas} onChange={handleChange(SET_FAKULTAS)}  placeholder="Fakultas" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>idLine</Form.Label>
                    <Form.Control type="text" value={idLine} onChange={handleChange(SET_IDLINE)} placeholder="Id Line" />
                </Form.Group>
            </Form>
            <br/>
            <Button variant="contained" color="primary" onClick={()=>setWhichForm(whichForm+1)}>Continue</Button>
        </>
    )
}

export default FirstRegisterForm
