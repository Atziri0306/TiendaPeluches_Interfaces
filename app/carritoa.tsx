import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CarritoScreen() {
  const params = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const resolverImagen = (key: string) => {
    switch (key) {
      case "kitty": return require("../../assets/images/kitty.png");
      case "luffy": return require("../../assets/images/luffy.jpg");
      default: return require("../../assets/images/image.png");
    }
  };

  useEffect(() => {
    if (params.nuevoNombre) {
      const itemNuevo = {
        id: Date.now().toString(),
        name: String(params.nuevoNombre),
        price: parseFloat(String(params.nuevoPrecio || 0)),
        qty: parseInt(String(params.nuevaCantidad || 1), 10),
        imageKey: String(params.nuevaImagen || "image"),
      };
      setCartItems([itemNuevo]);
    }
  }, [params.nuevoNombre, params.nuevaCantidad]);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleGenerarTicket = () => {
    router.push({
      pathname: "/ticket",
      params: { totalPagar: total },
    } as any);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/ini" as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerApp}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>〈</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RESUMEN DE COMPRA</Text>
        <Text style={styles.headerIcon}>🛍️</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tu carrito está vacío 🧸</Text>
            <TouchableOpacity style={styles.btnExplorar} onPress={() => router.push("/ini" as any)}>
              <Text style={styles.btnExplorarText}>Explorar Peluches</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemCarrito}>
                <Image source={resolverImagen(item.imageKey)} style={styles.imgItem} resizeMode="cover" />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemQtyTxt}>Cantidad: {item.qty}</Text>
                  <Text style={styles.itemPrice}>${item.price * item.qty}</Text>
                </View>
              </View>
            ))}

            <View style={styles.resumenContainer}>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenTextLabel}>Modalidad</Text>
                <Text style={styles.resumenTextVal}>Pago Físico en Caja</Text>
              </View>
              <View style={[styles.resumenRow, { borderTopWidth: 1, borderColor: "#573880", marginTop: 10, paddingTop: 10 }]}>
                <Text style={styles.totalText}>Total a cobrar</Text>
                <Text style={styles.totalVal}>${total}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.btnPagar} onPress={handleGenerarTicket}>
              <Text style={styles.btnPagarText}>GENERAR TICKET - ${total}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1135" },
  headerApp: { backgroundColor: "#321D4F", paddingTop: 45, paddingBottom: 15, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: 24, borderBottomRightRadius: 24, borderBottomWidth: 2, borderColor: "#573880" },
  backBtn: { backgroundColor: "#1F1135", width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#573880" },
  backText: { color: "#F472B6", fontSize: 18, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", letterSpacing: 0.5 },
  headerIcon: { fontSize: 18 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  emptyContainer: { marginTop: 100, alignItems: "center" },
  emptyText: { fontSize: 16, color: "#D8B4FE", fontWeight: "bold", marginBottom: 16 },
  btnExplorar: { backgroundColor: "#7C3AED", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 14 },
  btnExplorarText: { color: "#FFF", fontWeight: "900" },
  itemCarrito: { backgroundColor: "#321D4F", borderRadius: 20, padding: 14, flexDirection: "row", alignItems: "center", marginBottom: 16, borderWidth: 1, borderColor: "#573880", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  imgItem: { width: 75, height: 75, borderRadius: 14, backgroundColor: "#1F1135" },
  itemInfo: { flex: 1, marginLeft: 14 },
  itemTitle: { fontWeight: "900", fontSize: 14, color: "#FFFFFF", marginBottom: 4 },
  itemQtyTxt: { fontSize: 12, color: "#D8B4FE", marginBottom: 6, fontWeight: "600" },
  itemPrice: { fontWeight: "900", color: "#F472B6", fontSize: 15 },
  resumenContainer: { backgroundColor: "#321D4F", borderRadius: 20, padding: 20, marginVertical: 10, borderWidth: 1, borderColor: "#573880" },
  resumenRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resumenTextLabel: { color: "#9CA3AF", fontSize: 13, fontWeight: "600" },
  resumenTextVal: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  totalText: { fontWeight: "900", color: "#FFFFFF", fontSize: 15 },
  totalVal: { fontWeight: "900", color: "#F472B6", fontSize: 20 },
  btnPagar: { backgroundColor: "#7C3AED", borderRadius: 16, padding: 16, alignItems: "center", marginTop: 16, borderWidth: 1, borderColor: "#9333EA", shadowColor: "#7C3AED", shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  btnPagarText: { color: "#FFFFFF", fontWeight: "900", fontSize: 14, letterSpacing: 0.5 },
});