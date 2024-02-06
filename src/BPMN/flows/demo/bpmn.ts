const finalSchema =  {
    "type": "object",
    "title": "Number fields & widgets",
    "properties": {
        "numberA": {
            "title": "NumberA",
            "type": "number"
        },
        "number": {
            "title": "Number",
            "type": "number"
        }
    }
}  as const
export default finalSchema;   