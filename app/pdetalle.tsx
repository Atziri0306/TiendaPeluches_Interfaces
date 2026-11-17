import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetalleScreen() {
  const { nombre, precio, imagenKey } = useLocalSearchParams();
  const nombreProducto = String(nombre || "Peluche");
  const keyImg = String(imagenKey || "image");

  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("Mediano (30cm)");

  const precioNumerico = precio ? parseFloat(String(precio).replace(/[^0-9.]/g, "")) : 280;
  const precioTotal = precioNumerico * cantidad;

  const resolverImagen = (key: string, nombre: string) => {
    const n = nombre.toLowerCase();
    if (key === "kitty" || n.includes("kitty")) return require("../../assets/images/kitty.png");
    if (key === "luffy" || n.includes("luffy")) return require("../../assets/images/luffy.jpg");
    return require("../../assets/images/image.png");
  };

  const obtenerDescripcion = (nombre: string) => {
    const n = nombre.toLowerCase();
    if (n.includes("kitty")) return "Edición coleccionable oficial. Material de felpa ultra suave, etiquetas originales y diseño de alta calidad.";
    if (n.includes("luffy")) return "Figura de peluche detallada del capitán de los Sombrero de Paja. Ideal para verdaderos fanáticos.";
    return "Peluche certificado de primera calidad, antialérgico y diseñado para coleccionistas exigentes.";
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/ini" as any);
    }
  };

  const handleAgregarAlCarrito = () => {
    router.push({
      pathname: "/carritoa",
      params: {
        nuevoNombre: `${nombreProducto} (${talla})`,
        nuevoPrecio: precioNumerico,
        nuevaCantidad: cantidad,
        nuevaImagen: keyImg,
      },
    } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerImageContainer}>
        <TouchableOpacity style={styles.btnBack} onPress={handleBack}>
          <Text style={styles.backIcon}>〈</Text>
        </TouchableOpacity>
        <Image 
          source={resolverImagen(keyImg, nombreProducto)} 
          style={styles.headerImage} 
          resizeMode="cover" 
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardDetails}>
          <View style={styles.rowBetween}>
            <Text style={styles.titulo}>{nombreProducto}</Text>
            <Text style={styles.precio}>${precioTotal}</Text>
          </View>

          <Text style={styles.badgeInfo}>✨ COLECCIONABLE OFICIAL</Text>
          <Text style={styles.descripcion}>{obtenerDescripcion(nombreProducto)}</Text>

          <Text style={styles.seccionTitulo}>SELECCIONA TAMAÑO</Text>
          <View style={styles.sizesRow}>
            {["Pequeño (20cm)", "Mediano (30cm)", "Gigante (60cm)"].map((t) => (
              <TouchableOpacity key={t} style={[styles.sizeCard, talla === t && styles.sizeCardActive]} onPress={() => setTalla(t)}>
                <Text style={[styles.sizeText, talla === t && styles.sizeTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.controlCantidad}>
          <TouchableOpacity onPress={() => setCantidad(Math.max(1, cantidad - 1))} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{cantidad}</Text>
          <TouchableOpacity onPress={() => setCantidad(cantidad + 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnAddCart} onPress={handleAgregarAlCarrito}>
          <Text style={styles.btnAddCartText}>AGREGAR AL CARRITO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1135" },
  headerImageContainer: { width: "100%", height: 300, backgroundColor: "#321D4F", position: "relative" },
  headerImage: { width: "100%", height: "100%" },
  btnBack: { position: "absolute", top: 45, left: 15, backgroundColor: "#1F1135", borderRadius: 20, width: 40, height: 40, justifyContent: "center", alignItems: "center", zIndex: 10, borderWidth: 1, borderColor: "#573880" },
  backIcon: { fontSize: 20, fontWeight: "bold", color: "#F472B6" },
  scrollContent: { padding: 16, marginTop: -30, paddingBottom: 100 },
  cardDetails: { backgroundColor: "#321D4F", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "#573880", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  titulo: { fontSize: 20, fontWeight: "900", color: "#FFFFFF", flex: 1, marginRight: 10 },
  precio: { fontSize: 22, fontWeight: "900", color: "#F472B6" },
  badgeInfo: { fontSize: 10, color: "#D8B4FE", fontWeight: "800", marginBottom: 12, letterSpacing: 1 },
  descripcion: { color: "#9CA3AF", fontSize: 13, marginBottom: 20, lineHeight: 18 },
  seccionTitulo: { fontWeight: "900", fontSize: 12, color: "#D8B4FE", marginBottom: 10, letterSpacing: 1 },
  sizesRow: { gap: 8, marginBottom: 10 },
  sizeCard: { padding: 12, backgroundColor: "#1F1135", borderRadius: 14, borderWidth: 1, borderColor: "#573880" },
  sizeCardActive: { backgroundColor: "#7C3AED", borderColor: "#F472B6" },
  sizeText: { color: "#9CA3AF", fontWeight: "bold", fontSize: 13, textAlign: "center" },
  sizeTextActive: { color: "#FFFFFF" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#321D4F", borderTopWidth: 2, borderTopColor: "#573880", padding: 16, flexDirection: "row", alignItems: "center", gap: 12 },
  controlCantidad: { flexDirection: "row", alignItems: "center", backgroundColor: "#1F1135", borderRadius: 14, padding: 8, borderWidth: 1, borderColor: "#573880" },
  qtyBtn: { paddingHorizontal: 10 },
  qtyBtnText: { fontWeight: "900", fontSize: 16, color: "#F472B6" },
  qtyText: { fontWeight: "900", marginHorizontal: 8, color: "#FFFFFF", fontSize: 15 },
  btnAddCart: { flex: 1, backgroundColor: "#7C3AED", borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#9333EA" },
  btnAddCartText: { color: "#FFFFFF", fontWeight: "900", fontSize: 13, letterSpacing: 0.5 },
});