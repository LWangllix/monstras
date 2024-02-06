export default {
  "name": "Biip",
  "prefix": "biip",
  "uri": "http://biip",
  "xml": {
    "tagAlias": "lowerCase"
  },
  "associations": [],
  "types": [
    {
      "name": "BiipFlowStart",
      "extends": [
        "bpmn:StartEvent"
      ],
      "properties": [
        {
          "name": "flowId",
          "isAttr": true,
          "type": "String"
        }

      ]
    },
    {
      "name": "BiipUserTask",
      "extends": [
        "bpmn:UserTask"
      ],
      "properties": [
        {
          "name": "jsonForm",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "candidates",
          "isAttr": true,
          "type": "String"
        }
      ]
    }
  ]
}