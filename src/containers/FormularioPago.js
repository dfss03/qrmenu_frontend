import React, {useContext, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

import {Form, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';

import { crearIntentoPago } from '../apis';
import AuthContext from '../contexts/AuthContext';

const FormularioPago = ({ color, monto, items, onDone }) => {
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const auth = useContext(AuthContext);
    const params = useParams();

    const onSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            setLoading(true);
            const json = await crearIntentoPago({
                metodo_pago: paymentMethod,
                amount: monto,
                lugar: params.id,
                mesa: params.mesa,
                detalles: items
            }, auth.token);

            if (json?.success) {
                toast(`Tu orden #${json.orden} esta siendo procesado`, {type: "success"});
                onDone();
                setLoading(false);
            }   else if (json?.error) {
                toast(json.error, {type: "error"});
                setLoading(false);
            }
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <CardElement options={{hidePostalCode: true}}/>
            <Button variant="standard" style={{backgroundColor: color}} className="mt-4" block type="submit"
                    disabled={loading}>
                {loading ? "Procesando..." : "Pagar"}
            </Button>
        </Form>
    );
};

const stripePromise = loadStripe('pk_test_51QVNPZLBIc2tpScQf02vCGFZoXJ2DUxbFWTWgINByFXkKcavqTEyMbBwORp9UFTNwwzOVjow7wHRU06gBtdwriD700AJpoTlND');

const StripeContext = (props) => (
    <Elements stripe={stripePromise}>
        <FormularioPago {...props} />
    </Elements>
);

export default StripeContext;