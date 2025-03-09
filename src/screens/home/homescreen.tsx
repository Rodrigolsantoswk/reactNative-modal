import { Button } from "@/src/components/Button";
import { ImageViewer } from "@/src/components/ImageViewer";
import { ThemedView } from "@/src/components/ThemedView";
import { StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import ModalScreen from "@/src/components/modalscreen";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ThemedText } from "@/src/components/ThemedText";
import { v4 as uuidv4 } from "uuid"; // Importa o gerador de UUID

interface IFormulario {
  email: string;
}

const PlaceholderImage = require("@/assets/images/zero-um-bw.png");

export function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>();
  const { handleSubmit, setValue } = useForm<IFormulario>();

  const clickDetails = () => {
    router.navigate("/details");
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    setUuid(""); // caso o modal seja fechado, o UID retorna para vazio limpando o texto na tela.
  };

  const onSubmit: SubmitHandler<IFormulario> = (data) => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    
    if (regEmail.test(data.email)) return setUuid(uuidv4());
    alert("Email inválido"); // caso o return não seja acionado, então o alert informará que o email é inválido.
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </ThemedView>
      <ThemedView style={styles.footerContainer}>
        <Button theme="primary" label="Modal" onPress={() => setIsModalVisible(true)} />
        <Button label="Details" onPress={clickDetails} />
      </ThemedView>

      <ModalScreen isVisible={isModalVisible} onClose={onModalClose}>
        <ThemedView style={styles.modalContent}>
            <TextInput
              placeholder="Digite seu e-mail"
              style={styles.input}
              onChangeText={(text) => setValue("email", text)}
            />
            <Button theme="primary" label="enviar" onPress={handleSubmit(onSubmit)}/>
            {uuid && ( // Caso a variável não possuia atribuição, o texto não aparece. 
                       // https://codeburst.io/javascript-short-circuit-conditionals-bbc13ac3e9eb
                <ThemedText style={styles.uuidText}>
                    UUID Gerado: {uuid}
                </ThemedText>
            )}
        </ThemedView>
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
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: 250,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: "white",
  },
  uuidText: {
    marginTop: 20,
    fontWeight: "bold",
    color: "white",
  },
});