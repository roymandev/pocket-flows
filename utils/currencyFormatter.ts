export const numberToIDR = (
  number: number,
  display: "short" | "long" = "long"
) => {
  if (display === "long") {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  if (display === "short") {
    const symbol = "Rp";
    const suffixes = ["", "rb", "jt", "M", "B"]; // Customize the suffixes as per your requirement
    let suffixNum = 0;
    let formattedNumber = number;

    while (formattedNumber >= 1000 && suffixNum < suffixes.length - 1) {
      formattedNumber /= 1000;
      suffixNum++;
    }

    if (formattedNumber % 1 !== 0) {
      formattedNumber = parseInt(formattedNumber.toFixed(2));
    }

    return `${symbol} ${formattedNumber} ${suffixes[suffixNum]}`;
  }
};
