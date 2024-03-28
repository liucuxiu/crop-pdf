from PyPDF2 import PdfReader, PdfWriter

def crop_pdf(input_path, output_path):
    with open(input_path, 'rb') as file:
        reader = PdfReader(file)
        writer = PdfWriter()

        for i, page in enumerate(reader.pages):
            page_width = page.mediabox.width
            page_height = page.mediabox.height
            half_width = page_width / 2
#             page.cropbox.lower_left = (0, 0)
#             page.cropbox.upper_right = (page_width, page_height - 125)

            if i % 2 == 1:
                page.cropbox.lower_left = (0, 30)
                page.cropbox.upper_right = (half_width, page_height)
            else:
                page.cropbox.lower_left = (half_width, 30)
                page.cropbox.upper_right = (page_width, page_height)
            writer.add_page(page)

        with open(output_path, 'wb') as output_file:
            writer.write(output_file)

# Example usage:
crop_pdf('./inputPdf/duyen.pdf', 'duyen.pdf')
