<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>

:PRI rdf:type owl:NamedIndividual ,
:UC .


:GCS rdf:type owl:NamedIndividual ,
:UC .
    </xsl:template>
    
    <xsl:template match="Alunos">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="Aluno">
        <xsl:variable name="ident" select="Numero"/>
<xsl:value-of select="$ident"/>
:<xsl:value-of select="$ident"/> rdf:type owl:NamedIndividual ,
             :Pessoa ;
    :frequenta :<xsl:value-of select="UC"/> ;
    :curso "<xsl:value-of select="Curso"/>"^^xsd:string ;
    :email "<xsl:value-of select="Email"/>"^^xsd:string ;
    :ident "<xsl:value-of select="$ident"/>"^^xsd:string ;
    :nome "<xsl:value-of select="Nome"/>"^^xsd:string .           
    </xsl:template>
            
</xsl:stylesheet>