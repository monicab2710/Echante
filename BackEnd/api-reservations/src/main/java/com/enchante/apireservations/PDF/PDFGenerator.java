package com.enchante.apireservations.PDF;

import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.lowagie.text.*;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.PdfPTable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class PDFGenerator {

    private List<ReservationDTO> userReservations;
    private static final Logger logger = LoggerFactory.getLogger(PDFGenerator.class);

    public PDFGenerator() {
    }

    public void generate(HttpServletResponse response) {

        try {

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
            fontTitle.setSize(20);

            Paragraph paragraph = new Paragraph("Reservaciones", fontTitle);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(paragraph);

            PdfPTable table = new PdfPTable(7);
            table.setWidthPercentage(100f);
            table.setWidths(new int[]{7, 7, 7, 7, 7, 7, 7});
            table.setSpacingBefore(5);

            PdfPCell cell = new PdfPCell();
            cell.setBackgroundColor(CMYKColor.WHITE);
            cell.setPadding(7);

            Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
            font.setColor(CMYKColor.BLACK);

            cell.setPhrase(new Phrase("DNI", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Hora", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Fecha", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Número de Invitados", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Mensaje", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Status", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Email", font));
            table.addCell(cell);

            for (ReservationDTO r : userReservations) {

                table.addCell(String.valueOf(r.getId()));
                table.addCell(String.valueOf(r.getTime()));
                table.addCell(String.valueOf(r.getDate()));
                table.addCell(String.valueOf(r.getAmountDiners()));
                table.addCell(String.valueOf(r.getMessage()));
                table.addCell(String.valueOf(r.getStatus()));
                table.addCell(String.valueOf(r.getEmailUser()));
            }

            document.add(table);
            document.close();

        } catch (Exception e) {

            logger.error(e.getMessage());
        }
    }

    public void setUserReservations(List<ReservationDTO> userReservations) {
        this.userReservations = userReservations;
    }
}