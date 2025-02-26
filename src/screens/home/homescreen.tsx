import { Button } from "@/src/components/Button";
import { ImageViewer } from "@/src/components/ImageViewer";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import ModalScreen from "@/src/components/modalscreen";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { ThemedText } from "@/src/components/ThemedText";

interface IFormInput {
    email: string
}

const PlaceholderImage = require("@/assets/images/zero-um-bw.png");
export function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const onModalClose = () => {
        setIsModalVisible(false);
    };
    const clickDetails = () => {
        router.navigate("/details")
    }
    // react hook form
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
   
    // react hook form
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} />
            </ThemedView>
            <ThemedView style={styles.footerContainer}>
                <Button theme="primary" label="Modal" onPress=
                {()=>setIsModalVisible(true)} />
                <Button label="Details" onPress={clickDetails} />
            </ThemedView>
            <ModalScreen isVisible={isModalVisible} onClose={onModalClose}>
            {
                <ThemedView>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email", { required: true, maxLength: 20 })} />
                        <input type="submit" />
                    </form>
                    <ThemedText></ThemedText>
                </ThemedView>
                
            }
            </ModalScreen>
        </ThemedView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
});