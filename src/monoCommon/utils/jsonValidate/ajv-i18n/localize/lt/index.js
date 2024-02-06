module.exports = function localize(errors) {
  if (!(errors && errors.length)) return
  for (const e of errors) {
    let out
    switch (e.keyword) {
      case "additionalItems":
      case "items":
        out = ""
        var n = e.params.limit
        out += "negali turėti daugiau kaip " + n;
        if (n != 1) {
          out += " elementus"
        } else {
          out += " elementą"
        }
        break
      case "additionalProperties":
        out = "negali turėti papildomų savybių"
        break
      case "anyOf":
        out = 'turi tenkinti schemą "anyOf"'
        break
      case "const":
        out = "turi būti lygu konstantai"
        break
      case "contains":
        out = "turi turėti teisingą elementą"
        break
      case "dependencies":
      case "dependentRequired":
        out = ""
        var n = e.params.depsCount
        out += "turi turėti savyb"
        if (n == 1) {
          out += "ę"
        } else {
          out += "es"
        }
        out +=
          " " +
          e.params.deps +
          " kai savybė " +
          e.params.property +
          " nustatyta"
        break
      case "discriminator":
        switch (e.params.error) {
          case "tag":
            out = 'savybė "' + e.params.tag + '" turi būti tekstas'
            break
          case "mapping":
            out = 'savybė turi būti "' + e.params.tag + '" viena iš'
            break
          default:
            out = 'turi tenkinti "' + e.keyword + '" taisyklę'
        }
        break
      case "enum":
        out = "turi būti viena iš"
        break
      case "false schema":
        out = "schema is neigiama"
        break
      case "format":
        if (e.params.format === "email") {
          out = "neteisingas el. pašto adresas"
        } else if (e.params.format === "kodas") {
          out = "neteisingas kodas"
        } else {
          out = 'turi būti formato "' + e.params.format + '"'
        }
        break
      case "formatMaximum":
      case "formatExclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "turi būti " + cond
        break
      case "formatMinimum":
      case "formatExclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "turi būti " + cond
        break
      case "if":
        out = 'turi tenkinti "' + e.params.failingKeyword + '" schema'
        break
      case "maximum":
      case "exclusiveMaximum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "turi būti " + cond
        break
      case "maxItems":
        out = ""
        var n = e.params.limit
        out += "turi turėti nedaugiau kaip " + n + " element"
        if (n != 1) {
          out += "us"
        } else {
          out += "ą"
        }
        break
      case "maxLength":
        out = ""
        var n = e.params.limit
        out += "nedaugiau kaip " + n + " raid"
        if (n != 1) {
          out += "žių"
        } else {
          out += "ę"
        }
        break
      case "maxProperties":
        out = ""
        var n = e.params.limit
        out += "neturi turėti daugiau kaip " + n + " savyb"
        if (n == 1) {
          out += "es"
        } else {
          out += "ę"
        }
        break
      case "minimum":
      case "exclusiveMinimum":
        out = ""
        var cond = e.params.comparison + " " + e.params.limit
        out += "turi būti " + cond
        break
      case "minItems":
        out = ""
        var n = e.params.limit
        out += "neturi turėti mažiau negu " + n;
        if (n != 1) {
          out += " elementus"
        } else {
          out += " elementą"
        }
        break
      case "minLength":
        out = ""
        var n = e.params.limit
        out += "turi būti ilgesnis nei " + n + " "
        if (n != 1) {
          out += "simboliai"
        } else {
          out += "simbolis"
        }
        break
      case "minProperties":
        out = ""
        var n = e.params.limit
        out += " turi turėti ne mažiau negu  " + n + " savyb"
        if (n == 1) {
          out += "es"
        } else {
          out += "ę"
        }
        break
      case "multipleOf":
        out = "turi būti vienas iš " + e.params.multipleOf
        break
      case "not":
        out = ' turi netenkinti schemos'
        break
      case "oneOf":
        out = 'turi tenkinkti vieną iš "oneOf" schemų'
        break
      case "pattern":
        out = 'turi tenkinti  "' + e.params.pattern + '" šabloną'
        break
      case "patternRequired":
        out =
          'tuei turėti savybę tenkinančią  "' +
          e.params.missingPattern +
          '"'
        break
      case "propertyNames":
        out = "savybės turi turėti teisingus pavadinimus"
        break
      case "required":
        out = "turi turėti reikalaujamą savybę " + e.params.missingProperty
        break
      case "type":
        out = "turi būti " + e.params.type
        break
      case "unevaluatedItems":
        out = ""
        var n = e.params.len
        out += "turi turėti nedaugiau negu  " + n + " "
        if (n != 1) {
          out += "savybes"
        } else {
          out += "savybę"
        }
        break
      case "unevaluatedProperties":
        out = "neturi turėti neteisingų savybių"
        break
      case "uniqueItems":
        out =
          "  neturi turėti besidubliuojančių elementų (elemantai ## " +
          e.params.j +
          " ir " +
          e.params.i +
          " yra vienodi)"
        break
      default:
        out = 'turi tenkinti "' + e.keyword + '" validaciją'
    }
    e.message = out
  }
}
