import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 50,
    fontSize: 11,
    fontFamily: "Arial",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
    flexDirection: "column",
    display: "flex",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
    padding: 6,
    borderWidth: 1,
    borderColor: "#222",
  },
});

// Receives the whole application row
export default function BarangayClearance_Forms({ application }) {
  const profile = application?.ApplicationCreator?.UserProfile ?? {};

  const fullName = `${profile?.name?.first || ""} ${profile?.name?.last || ""}`;
  const contactNumber = profile?.phone_number || "";
  const address = profile?.address?.street_address || "";
  const createdDate = new Date(application?.createdAt).toLocaleString("en-PH");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{fullName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{application?.ApplicationCreator?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Contact Number</Text>
          <Text style={styles.value}>{contactNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Application Status</Text>
          <Text style={styles.value}>{application?.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Generated Date</Text>
          <Text style={styles.value}>{createdDate}</Text>
        </View>

      </Page>
    </Document>
  );
}
