import { method, soapResultToProfile } from ".";
import { Result } from "./config";


const laimisSoap = `<soap:Envelope
xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<SOAP-ENV:Header
   xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"/>
   <soap:Body>
      <authentication:authenticationDataResponse
         xmlns:authentication="http://www.epaslaugos.lt/services/authentication"
         xmlns:dsig="http://www.w3.org/2000/09/xmldsig#"
         xmlns:ns3="http://viisp.ivpk.lt/systemHealth"
         xmlns:ns4="http://www.w3.org/2001/10/xml-exc-c14n#" id="uniqueId">
         <authentication:authenticationProvider>auth.signatureProvider</authentication:authenticationProvider>
         <authentication:authenticationAttribute>
            <authentication:attribute>lt-company-code</authentication:attribute>
            <authentication:value>304921453</authentication:value>
         </authentication:authenticationAttribute>
         <authentication:authenticationAttribute>
            <authentication:attribute>lt-personal-code</authentication:attribute>
            <authentication:value>36444444</authentication:value>
         </authentication:authenticationAttribute>
         <authentication:userInformation>
            <authentication:information>firstName</authentication:information>
            <authentication:value>
               <authentication:stringValue>LAIMUTIS</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>lastName</authentication:information>
            <authentication:value>
               <authentication:stringValue>RUNKEVI&#x10c;IUS</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>email</authentication:information>
            <authentication:value>
               <authentication:stringValue>laimis@itsaugumas.com</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>phoneNumber</authentication:information>
            <authentication:value>
               <authentication:stringValue>+37069940006</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>companyName</authentication:information>
            <authentication:value>
               <authentication:stringValue>MB "IT saugumas"</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:customData>{"originalUrl":"/sveiki","host":"http://pasaukimas.lt:3000"}</authentication:customData>
         <authentication:sourceData>
            <authentication:type>BANKLINK</authentication:type>
            <authentication:parameter name="OID.2.5.4.97">NTREE-10747013</authentication:parameter>
            <authentication:parameter name="C">EE</authentication:parameter>
            <authentication:parameter name="data">RefChLiFYFKdKPO7sf_GyjSOLBVDOuktSyg4Ze_rl1lYH3e8tBAyCEJWjMRlg3ZABUXYk8CQR3zNFTrum3wi-Q87J0bIiAZ9ZWXqc1dJ0uF_YhWGvkRh3w-l835tDFSGnniu9n7zGLcc6_ucwDyPU4I95pKjK_elaS53pRd653h3HUBEp0mmHMEMMqgVeQkk</authentication:parameter>
            <authentication:parameter name="CN">EID-SK 2016</authentication:parameter>
            <authentication:parameter name="O">AS Sertifitseerimiskeskus</authentication:parameter>
         </authentication:sourceData>
         <Signature
            xmlns="http://www.w3.org/2000/09/xmldsig#">
            <SignedInfo>
               <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                  <InclusiveNamespaces
                     xmlns="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="authentication"/>
                  </CanonicalizationMethod>
                  <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
                  <Reference URI="#uniqueId">
                     <Transforms>
                        <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                        <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                           <InclusiveNamespaces
                              xmlns="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="authentication"/>
                           </Transform>
                        </Transforms>
                        <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                        <DigestValue>tJ3PKIm2rpYFyCnwRySniniKYhg=</DigestValue>
                     </Reference>
                  </SignedInfo>
                  <SignatureValue>JAJxD48NnpzJTz/8qU5oA7BKaLA3g2Sg23Sr3ZCElcTe5FOkzhtveZo83Dgs9cbujDl+wItobbmf
pBJlXdt5tfR9RoqmMjkQLkw5bRUt3QefaILtNfV5rR7iysMnFkV53LXRUZSVxfUtwb9mqN9kusnW
93KCf8SSI3+efVVCHTo=</SignatureValue>
                  <KeyInfo>
                     <KeyValue>
                        <RSAKeyValue>
                           <Modulus>0+HdYaHkPLQkaO+XVa/+tl9poh+MgyEZN8O/GA71J/lYqcLo4HitNmjVumso9KGGCfJoLRoPutIg
kXsl2x6aZ1iMaYQdcDlkhBnj46TPAy5+hgAk3rNmpiMZ96f2b+R8XeM3J80hkLZzYeRXIL2LmH7t
4x6p9jI82+GytmJczRc=</Modulus>
                           <Exponent>AQAB</Exponent>
                        </RSAKeyValue>
                     </KeyValue>
                  </KeyInfo>
               </Signature>
            </authentication:authenticationDataResponse>
         </soap:Body>
      </soap:Envelope>`;


const perconalSoapesult = `

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"/>
   <soap:Body>
      <authentication:authenticationDataResponse xmlns:authentication="http://www.epaslaugos.lt/services/authentication" xmlns:dsig="http://www.w3.org/2000/09/xmldsig#" xmlns:ns3="http://viisp.ivpk.lt/systemHealth" xmlns:ns4="http://www.w3.org/2001/10/xml-exc-c14n#" id="uniqueId">
         <authentication:authenticationProvider>auth.lt.bank</authentication:authenticationProvider>
         <authentication:authenticationAttribute>
            <authentication:attribute>lt-personal-code</authentication:attribute>
            <authentication:value>333666777</authentication:value>
         </authentication:authenticationAttribute>
         <authentication:userInformation>
            <authentication:information>firstName</authentication:information>
            <authentication:value>
               <authentication:stringValue>TESTAS</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>lastName</authentication:information>
            <authentication:value>
               <authentication:stringValue>TESTAUSKAS</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>email</authentication:information>
            <authentication:value>
               <authentication:stringValue>test@am.com</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>phoneNumber</authentication:information>
            <authentication:value>
               <authentication:stringValue>+3706554433</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>companyName</authentication:information>
            <authentication:value/>
         </authentication:userInformation>
         <authentication:customData>{"originalUrl":"/choses","host":"http://1.1.1.13000"}</authentication:customData>
         <authentication:sourceData>
            <authentication:type>BANKLINK</authentication:type>
            <authentication:parameter name="SRC">73000</authentication:parameter>
            <authentication:parameter name="PERSON_CODE">333666777</authentication:parameter>
            <authentication:parameter name="TIME">2021-10-04 12:44:29</authentication:parameter>
            <authentication:parameter name="PERSON_FNAME">TESTAS</authentication:parameter>
            <authentication:parameter name="VK_MAC">C3F1eO4PwSInyr+zg5tGXwHAhC7+R4MIKyglWYTX7U1IQNa5Bo9qnOirVmMA3ocL1QX76ZPzETXSILcSzd6QGoXOcRMRkslu16tNbO8shu3uG8BqJkvg61OA4JOYeTP/3HrTDmmByZzCPfh2bQbmBMZnmpBqXXP0pRB/lI3EI14=</authentication:parameter>
            <authentication:parameter name="PERSON_LNAME">TESTAUSKAS</authentication:parameter>
            <authentication:parameter name="SIGNATURE">SbueK+jycq+cz81jU+lLSL6gTB1d//3JIZ1Jtw3YoaYOlQwwdsFm3W8xEiFz1nvs6ZV19tO6MTYA24kfHLdo8eH8fq82uzLIENFUtpLVLEZakn0K1VsgjFpn+AA/EDw1lrE/scL3Ry3neAc9zAlVH89LlUt+5QaqbZipc5Y6sGY=</authentication:parameter>
            <authentication:parameter name="TYPE">BANK-01</authentication:parameter>
            <authentication:parameter name="VK_ENCODING">ISO-8859-13</authentication:parameter>
         </authentication:sourceData>
         <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
            <SignedInfo>
               <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                  <InclusiveNamespaces xmlns="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="authentication"/>
               </CanonicalizationMethod>
               <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
               <Reference URI="#uniqueId">
                  <Transforms>
                     <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                     <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                        <InclusiveNamespaces xmlns="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="authentication"/>
                     </Transform>
                  </Transforms>
                  <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                  <DigestValue>Tyem1r3WbMRf+vlkosbcYLim4MM=</DigestValue>
               </Reference>
            </SignedInfo>
            <SignatureValue>x8H2hDK0u78ig/AhbNgPDif0fgiso22dptmlLGjbTgAIApU36O1G8B1adywUf3EBij6EpXqPQxsZ
               CvcRYabJ+qDe3SmtkehehxjlsXp86x2Na/8pbAF1iw5LETjnQrnZ+JZ97q9UCPdEhA52Mvmzht2U
               xlnUvraPpwOmCN/39RQ=
            </SignatureValue>
            <KeyInfo>
               <KeyValue>
                  <RSAKeyValue>
                     <Modulus>0+HdYaHkPLQkaO+XVa/+tl9poh+MgyEZN8O/GA71J/lYqcLo4HitNmjVumso9KGGCfJoLRoPutIg
                        kXsl2x6aZ1iMaYQdcDlkhBnj46TPAy5+hgAk3rNmpiMZ96f2b+R8XeM3J80hkLZzYeRXIL2LmH7t
                        4x6p9jI82+GytmJczRc=
                     </Modulus>
                     <Exponent>AQAB</Exponent>
                  </RSAKeyValue>
               </KeyValue>
            </KeyInfo>
         </Signature>
      </authentication:authenticationDataResponse>
   </soap:Body>
</soap:Envelope>
`
const exampleSoapResult = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" />
   <soap:Body>
      <authentication:authenticationDataResponse xmlns:authentication="http://www.epaslaugos.lt/services/authentication" xmlns:dsig="http://www.w3.org/2000/09/xmldsig#" xmlns:ns3="http://viisp.ivpk.lt/systemHealth" xmlns:ns4="http://www.w3.org/2001/10/xml-exc-c14n#" id="uniqueId">
         <authentication:authenticationProvider>auth.signatureProvider</authentication:authenticationProvider>
         <authentication:authenticationAttribute>
            <authentication:attribute>lt-company-code</authentication:attribute>
            <authentication:value>304921453</authentication:value>
         </authentication:authenticationAttribute>
         <authentication:authenticationAttribute>
            <authentication:attribute>lt-personal-code</authentication:attribute>
            <authentication:value>36101110058</authentication:value>
         </authentication:authenticationAttribute>
         <authentication:userInformation>
            <authentication:information>firstName</authentication:information>
            <authentication:value>
               <authentication:stringValue>TESTAS</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>lastName</authentication:information>
            <authentication:value>
               <authentication:stringValue>TESTAUSKAS</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>email</authentication:information>
            <authentication:value>
               <authentication:stringValue>some@test.com</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>phoneNumber</authentication:information>
            <authentication:value>
               <authentication:stringValue>+3706788822</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:userInformation>
            <authentication:information>companyName</authentication:information>
            <authentication:value>
               <authentication:stringValue>MB "IT testas"</authentication:stringValue>
            </authentication:value>
         </authentication:userInformation>
         <authentication:customData>{"originalUrl":"/choses","host":"http://1.1.1.13000"}</authentication:customData>
         <authentication:sourceData>
            <authentication:type>BANKLINK</authentication:type>
            <authentication:parameter name="OID.2.5.4.97">NTREE-10747013</authentication:parameter>
            <authentication:parameter name="C">EE</authentication:parameter>
            <authentication:parameter name="data">RefChLiFYFKdKPO7sf_GyjSOLBVDOuktSyg4Ze_rl1lYH3e8tBAyCEJWjMRlg3ZA2nPiVnnp0Q7V9Ftfxblq_j1gxw-nd3o_WrKZUlBv-3XlzSx8XoxXsCx_QDYGxQl8CMYdTf6W6I8BuI4MzgJHzEXjEXnkPtUK9L9EAT8FRo1ZSuOFGpj7Kwhl-rIaj_0F</authentication:parameter>
            <authentication:parameter name="CN">EID-SK 2016</authentication:parameter>
            <authentication:parameter name="O">AS Sertifitseerimiskeskus</authentication:parameter>
         </authentication:sourceData>
         <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
            <SignedInfo>
               <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                  <InclusiveNamespaces xmlns="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="authentication" />
               </CanonicalizationMethod>
               <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
               <Reference URI="#uniqueId">
                  <Transforms>
                     <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                     <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
                        <InclusiveNamespaces xmlns="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="authentication" />
                     </Transform>
                  </Transforms>
                  <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
                  <DigestValue>Cnz+sau0Qd+lvvsJmr6Mwc2qHMY=</DigestValue>
               </Reference>
            </SignedInfo>
            <SignatureValue>uf0j1MYUyn1PGii5gyYw4utfonQe6ynCCfooNGGnHKvCaXRRhU2CGxE8S3UmO2AKGxKNedqFa6XQ
WS1Ac/T92S0qsmna2Y48dxvn245cqwGCmswiXGhfo5UrzNk011GflvEho20s86BrICBbz5/Szwyo
03hR9WKunEGbn1loFAI=</SignatureValue>
            <KeyInfo>
               <KeyValue>
                  <RSAKeyValue>
                     <Modulus>0+HdYaHkPLQkaO+XVa/+tl9poh+MgyEZN8O/GA71J/lYqcLo4HitNmjVumso9KGGCfJoLRoPutIg
kXsl2x6aZ1iMaYQdcDlkhBnj46TPAy5+hgAk3rNmpiMZ96f2b+R8XeM3J80hkLZzYeRXIL2LmH7t
4x6p9jI82+GytmJczRc=</Modulus>
                     <Exponent>AQAB</Exponent>
                  </RSAKeyValue>
               </KeyValue>
            </KeyInfo>
         </Signature>
      </authentication:authenticationDataResponse>
   </soap:Body>
</soap:Envelope>

`;

describe("src/server/routers/eVartai/api/getTicket", () => {
   test("companyProfile", async () => {
      const soapProfile = soapResultToProfile(exampleSoapResult);
      expect(soapProfile.email).toBe("some@test.com");
      expect(soapProfile.firstName).toBe("TESTAS");
      expect(soapProfile.lastName).toBe("TESTAUSKAS");
      expect(soapProfile.phoneNumber).toBe("+3706788822");
      expect(soapProfile.companyCode).toBe("304921453");
      expect(soapProfile.companyName).toBe("MB \"IT testas\"");

   });
   test("personalProfile", async () => {
      const soapProfile = soapResultToProfile(perconalSoapesult);
      expect(soapProfile.email).toBe("test@am.com");
      expect(soapProfile.firstName).toBe("TESTAS");
      expect(soapProfile.lastName).toBe("TESTAUSKAS");
      expect(soapProfile.phoneNumber).toBe("+3706554433");
      expect(soapProfile.companyCode).toBe(null);
      expect(soapProfile.companyName).toBe(undefined);
   });
   test("laimis", async () => {
      const soapProfile = soapResultToProfile(laimisSoap);
      expect(soapProfile.code).toBe("36444444");
   });
});
