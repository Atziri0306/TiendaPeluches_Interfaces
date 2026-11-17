import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function PantallaCarga() {
  const [progreso, setProgreso] = useState<number>(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo);
          setTimeout(() => {
            router.replace("/ini" as any); 
          }, 200);
          return 100;
        }
        return prev + 10; 
      });
    }, 120); 

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardBranding}>
        <Image
          source={require("../../assets/images/image.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titulo}>PLUSHIE SHOP</Text>
        <Text style={styles.subtitulo}>✦ OFFICIAL TOY COLLECTION ✦</Text>

        <View style={styles.barraContenedor}>
          <View style={[styles.barraProgreso, { width: `${progreso}%` }]} />
        </View>

        <Text style={styles.textoPorcentaje}>{progreso}% CARGANDO MUNDO MÁGICO</Text>
      </View>

      <Text style={styles.firma}>♔AO EXPERIENCE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1135", justifyContent: "center", alignItems: "center", padding: 20 },
  cardBranding: { width: "100%", maxWidth: 340, backgroundColor: "#321D4F", borderRadius: 28, padding: 24, alignItems: "center", shadowColor: "#D8B4FE", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 10, borderWidth: 2, borderColor: "#573880" },
  logo: { width: width * 0.5, height: 160, marginBottom: 15 },
  titulo: { fontSize: 24, fontWeight: "900", color: "#FFFFFF", textAlign: "center", letterSpacing: 1 },
  subtitulo: { fontSize: 10, color: "#E9D5FF", textAlign: "center", letterSpacing: 3, marginBottom: 25, marginTop: 4, fontWeight: "800" },
  barraContenedor: { width: "100%", height: 8, backgroundColor: "#1F1135", borderRadius: 4, overflow: "hidden" },
  barraProgreso: { height: "100%", backgroundColor: "#F472B6", borderRadius: 4 },
  textoPorcentaje: { color: "#D8B4FE", fontSize: 10, marginTop: 12, fontWeight: "bold", letterSpacing: 1 },
  firma: { fontSize: 12, color: "#9CA3AF", marginTop: 30, letterSpacing: 2, fontWeight: "700" },
});