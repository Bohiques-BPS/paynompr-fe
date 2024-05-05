import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { getTalonario } from "../../utils/requestOptions";
import { EMPLOYER_DATA } from "../../models/employeer";
import { COMPANY_DATA } from "../../models/company";
import { TIME_DATA } from "../../models/time";
import { PAYMENT, PAYMENT_DATA } from "../../models/payment";
import Moment from "moment";
import { convertTimeToHoursWithDecimals } from "../../utils/functions";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontSize: "12px",
    padding: 24,
    backgroundColor: "#E4E4E4",
  },
  textFooter: {
    fontSize: "16px",
  },
  table: {
    marginTop: 16,
    flexGrow: 1,
    flexDirection: "column",
    textAlign: "left",
    alignContent: "space-between",
  },
  row: {
    flexDirection: "row",
    fontSize: "12px",
    marginTop: 8,

    backgroundColor: "#E4E4E4",
  },
  footer: {
    flexDirection: "row",
    fontSize: "12px",
    marginTop: 16,

    backgroundColor: "#E4E4E4",
  },
  right: {
    textAlign: "right",
  },
  col2: {
    flexDirection: "row",
  },
  section: {
    width: "33%",
    flexGrow: 1,
  },
});
interface Props {
  id_period: number;
  id_company: number;
  id_employer: number;
}

// Create Document Component
const Talonario = ({ id_period, id_company, id_employer }: Props) => {
  const [employerData, setEmployerData] = useState(EMPLOYER_DATA);
  const [companyData, setCompanyData] = useState(COMPANY_DATA);
  const [timeData, setTimeData] = useState(TIME_DATA);
  const [taxesData, setTaxesData] = useState([PAYMENT_DATA]);

  const setAmountTaxe = (taxe: PAYMENT) => {
    if (taxe.type_taxe == 1 && taxe.amount >= 0) {
      taxe.amount = taxe.amount * -1;
    }

    return taxe.amount;
  };
  const getTotal = () => {
    var total = 0;
    const regular_pay =
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          timeData.vacations_hours + ":" + timeData.vacations_min
        ) +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          timeData.sick_hours + ":" + timeData.sick_hours
        ) +
      timeData.tips +
      employerData.regular_time *
        convertTimeToHoursWithDecimals(
          timeData.regular_hours + ":" + timeData.regular_min
        ) +
      employerData.overtime *
        convertTimeToHoursWithDecimals(
          timeData.over_hours + ":" + timeData.over_min
        ) +
      employerData.mealtime *
        convertTimeToHoursWithDecimals(
          timeData.meal_hours + ":" + timeData.meal_min
        );
    total = regular_pay;
    taxesData.map((item) => {
      item.amount = setAmountTaxe(item);

      total = total + item.amount;
    });
    return total;
  };

  const getData = () => {
    getTalonario(id_company, id_employer, id_period)
      .then((response) => {
        // Data retrieval and processing
        setEmployerData(response.data.result.employer);
        setCompanyData(response.data.result.company);
        setTaxesData(response.data.result.taxes);
        setTimeData(response.data.result.time);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <View style={styles.section}>
            <Text>
              {employerData.first_name} {employerData.last_name}:{" "}
              {companyData.name}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.right}>
              {Moment(timeData.created_at).format("MM/DD/YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.col2}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.section}>WAGES</Text>
              <Text style={styles.section}>CURR</Text>
              <Text style={styles.section}>YEAR</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.section}>REG. PAY</Text>
              <Text style={styles.section}>${timeData.regular_pay}</Text>
              <Text style={styles.section}>${timeData.regular_pay * 12}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.section}>OVER TIME</Text>
              <Text style={styles.section}>${timeData.overtime_pay}</Text>
              <Text style={styles.section}></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.section}>MEAL TIME</Text>
              <Text style={styles.section}>${timeData.meal_time_pay}</Text>
              <Text style={styles.section}></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.section}>SICK TIME</Text>
              <Text style={styles.section}>${timeData.sick_pay}</Text>
              <Text style={styles.section}></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.section}>VACATION TIME</Text>
              <Text style={styles.section}>${timeData.vacation_pay}</Text>
              <Text style={styles.section}></Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.section}></Text>
              <Text style={styles.section}>CURR</Text>
              <Text style={styles.section}>YEAR</Text>
            </View>
            {taxesData.map((item, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.section}>{item.name}</Text>
                <Text style={styles.section}>${item.amount}</Text>
                <Text style={styles.section}>
                  ${(item.amount * 12).toFixed(2)}{" "}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.section}>
            <Text>VAC ACUM. ENF ACUM.</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.right}>Total ${getTotal()}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.section}>
            <Text style={styles.textFooter}>
              {employerData.first_name} {employerData.last_name}:{" "}
              {companyData.name}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.textFooter, styles.right]}>
              {Moment(timeData.created_at).format("MM/DD/YYYY")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Talonario;
