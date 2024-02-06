
    export default `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:biip="http://biip" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="start_event" biip:flowId="demo">
      <bpmn2:outgoing>Flow_1pnpnxx</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:sequenceFlow id="Flow_1pnpnxx" name="4" sourceRef="start_event" targetRef="Activity_A" />
    <bpmn2:userTask id="Activity_A" name="A" biip:jsonForm="{&#10;  &#34;title&#34;: &#34;A registration form&#34;,&#10;  &#34;description&#34;: &#34;A simple form example.&#34;,&#10;  &#34;type&#34;: &#34;object&#34;,&#10;  &#34;required&#34;: [&#10;    &#34;firstName&#34;,&#10;    &#34;lastName&#34;&#10;  ],&#10;  &#34;properties&#34;: {&#10;    &#34;firstName&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;title&#34;: &#34;First name&#34;,&#10;      &#34;default&#34;: &#34;Chuck&#34;&#10;    },&#10;    &#34;lastName&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;title&#34;: &#34;Last name&#34;&#10;    },&#10;    &#34;telephone&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;title&#34;: &#34;Telephone&#34;,&#10;      &#34;minLength&#34;: 10&#10;    }&#10;  }&#10;}">
      <bpmn2:incoming>Flow_1pnpnxx</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0xd8jlv</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_0xd8jlv" sourceRef="Activity_A" targetRef="Activity_00s8mv6" />
    <bpmn2:userTask id="Activity_00s8mv6" name="b" biip:jsonForm="{&#10;  &#34;type&#34;: &#34;object&#34;,&#10;  &#34;properties&#34;: {&#10;    &#34;name&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;minLength&#34;: 3,&#10;      &#34;description&#34;: &#34;Please enter your name&#34;&#10;    },&#10;    &#34;vegetarian&#34;: {&#10;      &#34;type&#34;: &#34;boolean&#34;&#10;    },&#10;    &#34;birthDate&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;format&#34;: &#34;date&#34;&#10;    },&#10;    &#34;nationality&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;enum&#34;: [&#10;        &#34;DE&#34;,&#10;        &#34;IT&#34;,&#10;        &#34;JP&#34;,&#10;        &#34;US&#34;,&#10;        &#34;RU&#34;,&#10;        &#34;Other&#34;&#10;      ]&#10;    },&#10;    &#34;personalData&#34;: {&#10;      &#34;type&#34;: &#34;object&#34;,&#10;      &#34;properties&#34;: {&#10;        &#34;age&#34;: {&#10;          &#34;type&#34;: &#34;integer&#34;,&#10;          &#34;description&#34;: &#34;Please enter your age.&#34;&#10;        },&#10;        &#34;height&#34;: {&#10;          &#34;type&#34;: &#34;number&#34;&#10;        },&#10;        &#34;drivingSkill&#34;: {&#10;          &#34;type&#34;: &#34;number&#34;,&#10;          &#34;maximum&#34;: 10,&#10;          &#34;minimum&#34;: 1,&#10;          &#34;default&#34;: 7&#10;        }&#10;      },&#10;      &#34;required&#34;: [&#10;        &#34;age&#34;,&#10;        &#34;height&#34;&#10;      ]&#10;    },&#10;    &#34;occupation&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;&#10;    },&#10;    &#34;postalCode&#34;: {&#10;      &#34;type&#34;: &#34;string&#34;,&#10;      &#34;maxLength&#34;: 5&#10;    }&#10;  },&#10;  &#34;required&#34;: [&#10;    &#34;occupation&#34;,&#10;    &#34;nationality&#34;&#10;  ]&#10;}">
      <bpmn2:incoming>Flow_0xd8jlv</bpmn2:incoming>
    </bpmn2:userTask>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_0xd8jlv_di" bpmnElement="Flow_0xd8jlv">
        <di:waypoint x="610" y="180" />
        <di:waypoint x="705" y="180" />
        <di:waypoint x="705" y="310" />
        <di:waypoint x="800" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1pnpnxx_di" bpmnElement="Flow_1pnpnxx">
        <di:waypoint x="218" y="220" />
        <di:waypoint x="349" y="220" />
        <di:waypoint x="349" y="180" />
        <di:waypoint x="510" y="180" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="330" y="193" width="7" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_0f6b9bn_di" bpmnElement="start_event">
        <dc:Bounds x="182" y="202" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1dlmrsg_di" bpmnElement="Activity_A">
        <dc:Bounds x="510" y="140" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1pt0ifu_di" bpmnElement="Activity_00s8mv6">
        <dc:Bounds x="800" y="270" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;
    