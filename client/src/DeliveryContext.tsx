import React from "react";

enum DeliveryType {
    Store = "In store pick-up",
    InPost = "InPost delivery",
    Home = "Home delivery",
};

enum PaymentType {
    Card = "Visa / Mastercard",
    Blik = "Blik",
};

const initState = {
    deliveryDetails: { 
        name: "", 
        surname: "", 
        address: "", 
        telephone: "", 
        email: "", 
        deliveryType: DeliveryType.Home, 
        paymentType: PaymentType.Card,
        inpostDetails: null as any,
    },
    setDeliveryDetails: (value: any) => { }
}

const DeliveryProvider: React.FC = ({ children }) => {
    const [deliveryDetails, setDeliveryDetails] = React.useState(() => {
        const saved = sessionStorage.getItem("DeliveryDetails");
        return saved ? JSON.parse(saved) : initState.deliveryDetails
    });
    React.useEffect(() => {
        sessionStorage.setItem("DeliveryDetails", JSON.stringify(deliveryDetails));
    }, [deliveryDetails]);

    React.useEffect(() => {
        const DeliveryDetailsString: string | null = sessionStorage.getItem("DeliveryDetails")
        if (DeliveryDetailsString) {
            setDeliveryDetails(JSON.parse(DeliveryDetailsString));
        }
    }, []);
    return (
        <DeliveryContext.Provider value={{ deliveryDetails, setDeliveryDetails }}>
            {children}
        </DeliveryContext.Provider>
    )
}
const DeliveryContext = React.createContext(initState);
export { DeliveryProvider, DeliveryContext, DeliveryType, PaymentType };