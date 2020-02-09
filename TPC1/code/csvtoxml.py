import csv

with open('PRI2019.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    f = open("ontologia.xml", "w")
    f.write(f'<Alunos>\n')
    for row in csv_reader:
        if line_count > 0:
            f.write(f'\t<Aluno>\n')
            f.write(f'\t\t<Numero>{row[0]}</Numero>\n')
            f.write(f'\t\t<Nome>{row[1]}</Nome>\n')
            f.write(f'\t\t<Email>{row[0].lower()}@alunos.uminho.pt</Email>\n')
            f.write(f'\t\t<Curso>MIEI</Curso>\n')
            if line_count % 2 == 0:
                f.write(f'\t\t<UC>PRI</UC>\n')
            else :
                f.write(f'\t\t<UC>GCS</UC>\n')
            f.write(f'\t</Aluno>\n')
        line_count += 1
    f.write(f'</Alunos>\n')
    f.close()
    print(f'Processed {line_count} lines.')