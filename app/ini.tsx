import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InicioScreen() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const productos = [
    { id: "1", name: "Osito Tierno", price: "$280", rating: "4.9", image: require("../../assets/images/image.png"), cat: "Ositos", imgKey: "image" },
    { id: "2", name: "Hello Kitty", price: "$220", rating: "4.8", image: require("../../assets/images/kitty.png"), cat: "Kawaii", imgKey: "kitty" },
    { id: "3", name: "Peluche Luffy", price: "$350", rating: "5.0", image: require("../../assets/images/luffy.jpg"), cat: "Anime", imgKey: "luffy" },
  ];

  const handlePedir = (producto: typeof productos[0]) => {
    router.push({
      pathname: "/pdetalle",
      params: { nombre: producto.name, precio: producto.price, imagenKey: producto.imgKey },
    } as any);
  };

  const productosFiltrados = categoriaActiva === "Todos" ? productos : productos.filter(p => p.cat === categoriaActiva);

  return (
    <View style={styles.container}>
      <View style={styles.headerApp}>
        <View style={styles.headerTop}>
          <View style={styles.badgeBox}><Text style={styles.badgeText}>⭐ TOY STORE</Text></View>
          <TouchableOpacity style={styles.cartButton} onPress={() => router.push("/carritoa" as any)}>
            <Text style={styles.headerIcon}>🛒</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>PLUSHIE SHOP</Text>
        <Text style={styles.headerSub}>Colecciona momentos suaves y felices ✨</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerPromo}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTag}>¡EDICIÓN LIMITADA!</Text>
            <Text style={styles.bannerTitle}>Nuevos modelos de colección</Text>
          </View>
          <Image source={require("../../assets/images/kitty.png")} style={styles.imgBanner} resizeMode="contain" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
          {["Todos", "Ositos", "Kawaii", "Anime"].map((cat) => (
            <TouchableOpacity key={cat} style={[styles.catItem, categoriaActiva === cat && styles.catActive]} onPress={() => setCategoriaActiva(cat)}>
              <Text style={categoriaActiva === cat ? styles.catTextActive : styles.catText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {productosFiltrados.map((prod) => (
            <TouchableOpacity key={prod.id} style={styles.cardProducto} activeOpacity={0.9} onPress={() => handlePedir(prod)}>
              <View style={styles.imageContainer}>
                <Image source={prod.image} style={styles.imgCard} resizeMode="cover" />
                <View style={styles.tagRating}><Text style={styles.ratingText}>⭐ {prod.rating}</Text></View>
              </View>
              <Text style={styles.prodName} numberOfLines={1}>{prod.name}</Text>
              <View style={styles.prodFooter}>
                <Text style={styles.prodPrice}>{prod.price}</Text>
                <View style={styles.btnVer}><Text style={styles.btnVerText}>VER</Text></View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/ini" as any)}><Text style={styles.navIconActive}>🏠</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/carritoa" as any)}><Text style={styles.navIcon}>🛒</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F1135" },
  headerApp: { backgroundColor: "#321D4F", paddingTop: 45, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, borderBottomWidth: 2, borderColor: "#573880" },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  badgeBox: { backgroundColor: "#F472B6", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900" },
  cartButton: { backgroundColor: "#4C2F75", width: 38, height: 38, borderRadius: 19, justifyContent: "center", alignItems: "center" },
  headerIcon: { fontSize: 16 },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", letterSpacing: 1 },
  headerSub: { color: "#D8B4FE", fontSize: 12, fontWeight: "600", marginTop: 2 },
  scrollContent: { padding: 16, paddingBottom: 90 },
  bannerPromo: { backgroundColor: "#573880", borderRadius: 20, padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: "#7C3AED" },
  bannerTag: { color: "#F472B6", fontSize: 10, fontWeight: "900", letterSpacing: 1, marginBottom: 4 },
  bannerTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  imgBanner: { width: 70, height: 70, borderRadius: 12, backgroundColor: "#321D4F" },
  categoriesRow: { flexDirection: "row", gap: 10, paddingBottom: 15, marginBottom: 10 },
  catItem: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#321D4F", borderRadius: 16, borderWidth: 1, borderColor: "#573880" },
  catActive: { backgroundColor: "#7C3AED", borderColor: "#F472B6" },
  catText: { fontSize: 12, color: "#D8B4FE", fontWeight: "600" },
  catTextActive: { fontSize: 12, color: "#FFFFFF", fontWeight: "900" },
  grid: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  cardProducto: { width: "48%", backgroundColor: "#321D4F", borderRadius: 20, padding: 10, marginBottom: 16, borderWidth: 1, borderColor: "#573880", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  imageContainer: { position: "relative", width: "100%", height: 130, backgroundColor: "#1F1135", borderRadius: 14, overflow: "hidden", marginBottom: 10 },
  imgCard: { width: "100%", height: "100%" },
  tagRating: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(31,17,53,0.85)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  ratingText: { fontSize: 10, color: "#FBBF24", fontWeight: "bold" },
  prodName: { fontWeight: "bold", fontSize: 13, color: "#FFFFFF", marginBottom: 8 },
  prodFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  prodPrice: { fontWeight: "900", color: "#F472B6", fontSize: 14 },
  btnVer: { backgroundColor: "#7C3AED", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 },
  btnVerText: { color: "#FFFFFF", fontWeight: "900", fontSize: 10 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 65, backgroundColor: "#321D4F", borderTopWidth: 2, borderTopColor: "#573880", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  navIcon: { fontSize: 22, opacity: 0.4 },
  navIconActive: { fontSize: 22, color: "#F472B6" },
});