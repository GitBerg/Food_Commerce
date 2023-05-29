import { Head } from "../../../components/Head";
import { SnackTitle } from "../../../components/SnackTitle";
import { Snacks } from "../../../components/Snacks";
import { useSnack } from "../../../hooks/useSnack";


export default function IceCreams() {

    const { iceCreams } = useSnack()

    return (
        <>
        <Head title='Sorvetes' description="Nossos melhores Sorvetes"/>
        <SnackTitle>Sorvetes</SnackTitle>
        <Snacks snacks={iceCreams}/>
        </>
        )
}