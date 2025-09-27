import { useAuth } from "@/src/contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { EditFieldModal } from "../../modal/EditFieldModal/EditFieldModal";
import { styles } from "./CardMinhaConta.styles";

export function CardMinhaConta() {
  const { userData } = useAuth();

  const [localUser, setLocalUser] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    password: "",
  });

  const [activeField, setActiveField] = useState<
    "name" | "email" | "password" | null
  >(null);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const refs = useMemo(
    () => ({
      name: nameRef,
      email: emailRef,
      password: passwordRef,
    }),
    []
  );

  const resetValues = useCallback(() => {
    if (userData) {
      setLocalUser({
        name: userData.name,
        email: userData.email,
        password: "",
      });
    }
  }, [userData]);

  useEffect(() => {
    resetValues();
  }, [userData, resetValues]);

  const renderField = (
    label: string,
    field: keyof typeof localUser,
    secure?: boolean
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={field === "password" ? "********" : localUser[field]}
          secureTextEntry={secure}
          editable={false}
          placeholder={label}
          ref={refs[field]}
          pointerEvents="none"
          selectTextOnFocus={false}
          autoCapitalize="none"
          autoCorrect={false}
          contextMenuHidden={true}
        />

        <TouchableOpacity onPress={() => setActiveField(field)}>
          <MaterialIcons name="edit" size={styles.icon.fontSize} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <Text style={styles.title}>Minha conta</Text>

      {renderField("Nome", "name")}
      {renderField("E-mail", "email")}
      {renderField("Senha atual", "password", true)}

      <EditFieldModal
        visible={!!activeField}
        field={activeField}
        initialValue={activeField ? localUser[activeField] : ""}
        onClose={() => setActiveField(null)}
      />
    </View>
  );
}
