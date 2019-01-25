const TYPE_RESELLER = "reseller";
const TYPE_PVP = "pvp";
const LVMH_TYPE = "lvmh";
const MGI_TYPE = "mgi";
const OTHERS_TYPE = "Otros";

class InvoiceMaker {
  constructor(doc) {
    this.document = doc;
    this.rectWidth = 570;
    this.separatorX = 380;
    this.morinfoWidth = 400;
    this.footerContentX = 20;
    this.footerContentWidth = 200;
    this.headerLineNumber = 0;
    this.headerLineNumberR = 0;
  }

  getDoc = () => this.document;

  // calculatePositions = formType => {
  //   if (formType.indexOf(TYPE_RESELLER) !== -1) {
  //     this.rectWidth -= 100;
  //     this.separatorX -= 100;
  //     this.morinfoWidth -= 100;
  //     this.footerContentX += 200;
  //     this.footerContentWidth -= 10;
  //   }
  // };

  secondFormLeftWidth = type => (type.indexOf(TYPE_PVP) !== -1 ? 200 : 170);

  addLineHeader = (basePosition, left = true) => (
    text,
    fontSize = 9,
    align = "center"
  ) => {
    this.document
      .setFontSize(fontSize)
      .text(
        text,
        left ? 47 : 140,
        basePosition +
          5 * (left ? this.headerLineNumber : this.headerLineNumberR),
        {
          align,
          maxWidth: 60
        }
      );
    if (left) {
      this.headerLineNumber += 1;
    } else {
      this.headerLineNumberR += 1;
    }
  };

  pdfSetRjTictacInfo = (basePosition = 35, type = LVMH_TYPE) => {
    const writeHeaderLine = this.addLineHeader(basePosition);
    if (type.indexOf(OTHERS_TYPE) !== -1) {
      writeHeaderLine("RELOJERIA - JOYERIA TICTAC", 12);
    }
    writeHeaderLine("");
    writeHeaderLine("Juan Carlos López Mora");
    writeHeaderLine("42.026.779-Y");
    writeHeaderLine("C/SAN CLEMENTE, 8");
    writeHeaderLine("38003 - SANTA CRUZ DE TENERIFE");
    writeHeaderLine("922-24.23.85");
    writeHeaderLine("Santa Cruz de Tenerife");
    writeHeaderLine("Tenerife");
  };

  pdfSetCompanyHeader = headerType => {
    const writeHeaderLine = this.addLineHeader(20);

    if (headerType === LVMH_TYPE) {
      writeHeaderLine("LVMH RELOJERIA Y JOYERIA ESPAÑA", 10);
      writeHeaderLine("Servicio Técnico Oficial de Canarias");
      writeHeaderLine("TAG-HEUER - ZENITH");
      writeHeaderLine("CRISTIAN DIOR");
    } else {
      writeHeaderLine("MGI Luxury Group S.A", 12);
      writeHeaderLine("EBEL", 10);
      writeHeaderLine("Servicio Técnico Oficial Canarias", 6);
    }
  };

  pdfSetClientInfo = (basePosition = 35, params) => {
    const writeHeaderLine = this.addLineHeader(basePosition, false);

    writeHeaderLine(params.name.toUpperCase(), 9, "left");
    writeHeaderLine(params.cif, 9, "left");
    writeHeaderLine(params.street.toUpperCase(), 9, "left");
    writeHeaderLine(
      `${params.cp} - ${params.province.toUpperCase()}`,
      9,
      "left"
    );
    writeHeaderLine(`Tlf: ${params.tfno}`, 9, "left");
  };

  // pdfSetItems = (items, shipping, formModel) => {
  //   this.calculatePositions(formModel);
  //   const footerxPotition = this.footerContentX;
  //   let line = 0;
  //   let importe = 0;
  //   this.document.fontSize(10);
  //   items.forEach(item => {
  //     if (item.amount > 0) {
  //       const amount = parseFloat(item.amount)
  //         .toFixed(2)
  //         .toString();
  //       this.document.fontSize(12).text(amount, 23, 320 + line * 15);
  //       this.document.text(item.name.toLocaleUpperCase(), 123, 320 + line * 15);
  //       this.document.text(
  //         parseFloat(item.price.toString()).toFixed(2),
  //         463,
  //         320 + line * 15,
  //         {
  //           width: 100,
  //           align: "right"
  //         }
  //       );
  //       line += 1;
  //       importe += item.amount * item.price;
  //     }
  //   });
  //   const subtotal = parseFloat(importe) + parseFloat(shipping);
  //   const igic = parseFloat(importe) * 0.07;
  //   const total = igic + subtotal;

  //   this.document.text(
  //     parseFloat(importe).toFixed(2),
  //     footerxPotition + 85,
  //     625,
  //     {
  //       width: 95,
  //       align: "right"
  //     }
  //   );
  //   this.document.text(
  //     parseFloat(shipping).toFixed(2),
  //     footerxPotition + 85,
  //     637,
  //     {
  //       width: 95,
  //       align: "right"
  //     }
  //   );
  //   this.document.text(parseFloat(igic).toFixed(2), footerxPotition + 85, 649, {
  //     width: 95,
  //     align: "right"
  //   });
  //   this.document.text(
  //     parseFloat(total).toFixed(2),
  //     footerxPotition + 85,
  //     672,
  //     {
  //       width: 95,
  //       align: "right"
  //     }
  //   );
  // };

  formatDate = date =>
    date
      .split("-")
      .reverse()
      .join("/");

  // pdfSetDocumentBody = params => {
  //   const width = this.rectWidth;
  //   const separator = this.separatorX;
  //   const morinfoW = this.morinfoWidth;
  //   const footerX = this.footerContentX;
  //   const footerW = this.footerContentWidth;

  //   this.document.fontSize(10).text(`Nº Orden: ${params.numOrden}`, 490, 20);
  //   this.document.fontSize(11).text("Cliente", 25, 207);
  //   this.document.text(`:  ${params.customer.toLocaleUpperCase()}`, 100, 207, {
  //     width: this.secondFormLeftWidth(params.formType)
  //   });
  //   this.document.text("Dirección", 25, 236);
  //   if (params.formType.indexOf(TYPE_PVP) !== -1) {
  //     this.document.text(`:  TLF-${params.tlfno}`, 100, 236);
  //     this.document.text(`:  DNI ${params.dni.toLocaleUpperCase()}`, 100, 248);
  //   } else {
  //     this.document.text(`:  ${params.tlfno}`, 100, 236, {
  //       width: this.secondFormLeftWidth(params.formType)
  //     });
  //     this.document.text(`:  ${params.dni.toLocaleUpperCase()}`, 100, 248, {
  //       width: this.secondFormLeftWidth(params.formType)
  //     });
  //   }
  //   this.document.text("Plaza", 25, 262);
  //   this.document.text(`:  ${params.location.toLocaleUpperCase()}`, 100, 262, {
  //     width: this.secondFormLeftWidth(params.formType)
  //   });

  //   this.document.rect(20, 200, width / 2, 75); // Client data box
  //   this.document.rect(width / 2 + 20, 200, width / 2, 75); // Client data box
  //   this.document.text("Fecha de entrada", separator + 5, 207);
  //   this.document.text(
  //     `:  ${this.formatDate(params.entryDate)}`,
  //     separator + 105,
  //     207
  //   );
  //   this.document.text("Presupuesto", separator + 5, 222);
  //   this.document.text(`:  ${params.budget}`, separator + 105, 222);
  //   this.document.text("Modelo", separator + 5, 236);
  //   this.document.text(`:  ${params.model}`, separator + 105, 236);
  //   this.document.text("Nº Caja", separator + 5, 248);
  //   this.document.text(`:  ${params.box}`, separator + 105, 248);
  //   this.document.text("Nº Control", separator + 5, 262);
  //   this.document.text(`:  ${params.control}`, separator + 105, 262);

  //   if (params.formType.indexOf(TYPE_PVP) !== -1) {
  //     this.document.rect(20, 290, 570, 25); // Title
  //     this.document
  //       .fontSize(12)
  //       .text("DETALLE DE REPARACION - FORNITURA EMPLEADA", 23, 297);
  //     this.document.polygon(
  //       [footerX, 620],
  //       [footerX, 690],
  //       [footerX + footerW, 690],
  //       [footerX + footerW, 620],
  //       [20, 620],
  //       [590, 620]
  //     );
  //   } else {
  //     this.document.rect(20, 290, 470, 25); // Title
  //     this.document
  //       .fontSize(12)
  //       .text("DETALLE DE REPARACION - FORNITURA EMPLEADA", 23, 297);
  //     this.document.rect(500, 290, 90, 25); // IMPORTE
  //     this.document
  //       .fontSize(12)
  //       .text("IMPORTES", 503, 297, { width: 90, align: "center" });
  //     this.document.rect(180, 620, 200, 25); // impRecPubl
  //     this.document
  //       .fontSize(10)
  //       .text("Imp. Rec. Público:", 185, 627, { width: 100, align: "left" });
  //     this.document
  //       .fontSize(10)
  //       .text(params.impRecPubl, 270, 627, { width: 100, align: "left" });
  //     this.document.polygon(
  //       [footerX, 620],
  //       [footerX, 690],
  //       [footerX + footerW, 690],
  //       [footerX + footerW, 620],
  //       [20, 620],
  //       [590, 620]
  //     );
  //   }
  //   this.document
  //     .fontSize(11)
  //     .text("Nº Rep. Consecionario", 20, 625, { width: 195, align: "left" });
  //   this.document
  //     .fontSize(11)
  //     .text(params.nconsecionario, 20, 637, { width: 100, align: "center" });
  //   // Footer content
  //   this.document.text("Importe", footerX + 5, 625);
  //   this.document.text("Gastos de envio", footerX + 5, 637);
  //   this.document.text("I.G.I.C 7%", footerX + 5, 649);
  //   this.document.moveDown();
  //   this.document.text("TOTAL FACTURA");

  //   this.document.rect(20, 700, morinfoW, 70); // Observaciones
  //   this.document.text("Observaciones:", 23, 705);
  //   this.document.text(params.moreInfo, 23, 717, {
  //     width: 390,
  //     align: "justify"
  //   });

  //   this.document.rect(morinfoW + 40, 700, 150, 35); // Fecha de entrega
  //   this.document.text("Fecha de entrega", morinfoW + 43, 703, {
  //     width: 140,
  //     align: "center"
  //   });
  //   this.document.text(
  //     this.formatDate(params.deliveryDate),
  //     morinfoW + 43,
  //     717,
  //     {
  //       width: 140,
  //       align: "center"
  //     }
  //   );
  //   this.document.stroke();
  //   this.document.end();
  // };

  /**
   * Add a table pre-header with the invoice data
   */
  pdfSetContentHeader = data => {
    const baseLine = 100;
    let currentPosition = 23;
    const fieldProperties = {
      align: "left",
      maxWidth: 14
    };
    this.document.setFontStyle("bold");
    this.document.text("FACTURA: ", currentPosition, baseLine);
    currentPosition += 18;
    this.document.setFontStyle("normal");
    this.document.text(data.number, currentPosition, baseLine, fieldProperties);
    currentPosition += 50;
    this.document.setFontStyle("bold");
    this.document.text("Fecha:", currentPosition, baseLine);
    currentPosition += 13;
    this.document.setFontStyle("normal");
    this.document.text(data.date, currentPosition, baseLine, {
      align: "left",
      maxWidth: 18
    });
    currentPosition += 59;
    this.document.setFontStyle("bold");
    this.document.text("Vendedor:", currentPosition, baseLine);
    currentPosition += 18;
    this.document.setFontStyle("normal");
    this.document.text(data.seller, currentPosition, baseLine, fieldProperties);
  };

  pdfSetConentTable = params => {
    let baseLine = 108;
    let lastWidth = 23;
    this.document.line(lastWidth - 3, baseLine - 5, 190, baseLine - 5);
    params.headers.map(header => {
      this.document.text(header.name, lastWidth, baseLine);
      lastWidth = header.width;
    });

    lastWidth = 23;
    this.document.line(lastWidth - 3, baseLine + 3, 190, baseLine + 3);
    baseLine += 8;
    if (params.data) {
      params.data.map((row, rowIndex) => {
        row.map((cell, colIndex) => {
          const align = params.headers[colIndex].align;
          const columnWidth = params.headers[colIndex].name.length * 1.6;
          const position = align && align === 'right' ? lastWidth + columnWidth : lastWidth + 1;
          this.document.text(cell, position, baseLine + 8 * rowIndex, {
            align: align ? align : "left"
          });
          lastWidth = params.headers[colIndex].width;
        });
        lastWidth = 23;
      });
    }
  };
  
  drawMargins() {
    // 210 x 300
    this.document.setDrawColor('blue');
    this.document.line(20,0,20,300);
    this.document.line(190,0,190,300);
    this.document.setDrawColor('orange');
    this.document.line(23,0,23,300);
    this.document.line(187,0,187,300);
    this.document.setDrawColor('black');
  }

  pdfSetDocumentFooter = data => {
    const footerX = 43;
    const linea = 260;
    const lineaData = linea + 8;
    const fieldHeader = {
      align: "center",
      maxWidth: 20
    };
    const field = {
      align: "center",
      maxWidth: 20
    };

    if (data) {
      this.document.rect(footerX - 10, linea - 5, 145, 15);
      this.document.line(footerX - 10, linea + 2, 178, linea + 2);
      this.document.setFontStyle("bold");
      this.document.text("Tot.Bruto", footerX, linea, fieldHeader);
      this.document.text("%Dto.", footerX + 20, linea, fieldHeader);
      this.document.text("Descuento", footerX + 40, linea, fieldHeader);
      this.document.text("% IGIC", footerX + 60, linea, fieldHeader);
      this.document.text("Cuota", footerX + 80, linea, fieldHeader);
      this.document.text("G. ENVIO", footerX + 100, linea, fieldHeader);
      this.document.text("NETO", footerX + 120, linea, fieldHeader);
      this.document.setFontStyle("normal");

      this.document.text(data.totalBruto.toFixed(2), footerX, lineaData, field);
      this.document.text(
        data.descuento.toFixed(2),
        footerX + 20,
        lineaData,
        field
      );
      this.document.text(
        data.descuentoNeto.toFixed(2),
        footerX + 40,
        lineaData,
        field
      );
      this.document.text(data.igic.toFixed(2), footerX + 60, lineaData, field);
      this.document.text(
        data.igicNeto.toFixed(2),
        footerX + 80,
        lineaData,
        field
      );
      this.document.text(
        data.gastosEnvio.toFixed(2),
        footerX + 100,
        lineaData,
        field
      );
      this.document.setFontStyle("bold");
      this.document.text(data.totalNeto.toFixed(2), footerX + 120, lineaData, field);
    }
  };

  /**
   * Transform an aray list of object into array list of array of string
   */
  parceDataForTable = list => {
    const finalData = [];
    const _list = [...list];
    _list.map(row => {
      const rowList = [];
      Object.keys(row).map(key => {
        if (typeof row[key] !== "string") row[key] = row[key].toFixed(2);
        if (key === "amount") row[key] = row[key].split(".")[0];
        rowList.push(row[key]);
      });
      finalData.push(rowList);
    });
    return finalData;
  };
}

export {
  MGI_TYPE,
  LVMH_TYPE,
  OTHERS_TYPE,
  TYPE_RESELLER,
  TYPE_PVP,
  InvoiceMaker
};
