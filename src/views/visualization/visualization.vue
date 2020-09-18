<!--
 * @Description: antV流向图
 * @Author: lixianying
 * @Date: 2020-09-17
-->
<template>
  <div class="visualization-andv">
    <div id="jsContainer" ref="jsContainer" class="visual-container"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import { data } from "./data";
export default {
  data() {
    return {
      data: data,
      graph: undefined,
    };
  },
  mounted() {
    this.setChartPaintOption();
    this.initChart();
    this.setChartEvent();
    this.renderChart(this.data);
  },
  methods: {
    initChart() {
      const width = this.$refs.jsContainer.scrollWidth;
      const height = this.$refs.jsContainer.scrollHeight || 500;
      this.graph = new G6.Graph({
        container: "jsContainer",
        width,
        height,
        layout: {
          type: "dagre",
          rankdir: "LR",
          nodesep: 30,
          ranksep: 100,
        },
        modes: {
          default: ["drag-canvas"],
        },
        defaultNode: {
          type: "round-rect",
          labelCfg: {
            style: {
              fill: "#000000A6",
              fontSize: 14,
            },
          },
          style: {
            stroke: "#1A91FF",
            width: 150,
          },
        },
        defaultEdge: {
          type: "polyline",
        },
      });
    },
    setChartEvent() {
      // 事件
      this.graph.on("node:click", (evt) => {
        const item = evt.item; // 被操作的节点 item
        const target = evt.target; // 被操作的具体图形
        // ...
        console.log(item);
        console.log(target);
      });
      this.graph.on("edge:click", (evt) => {
        const item = evt.item; // 被操作的节点 item
        const target = evt.target; // 被操作的具体图形
        // ...
        console.log(item);
        console.log(target);
      });
    },
    renderChart(data) {
      this.graph.data(data);
      this.graph.render();
      this.graph.paint();
    },
    setChartPaintOption() {
      // 矩形框
      G6.registerNode(
        "round-rect",
        {
          drawShape: function drawShape(cfg, group) {
            const width = cfg.style.width;
            const stroke = cfg.style.stroke;
            const rect = group.addShape("rect", {
              attrs: {
                x: -width / 2,
                y: -15,
                width,
                height: 30,
                radius: 5,
                stroke,
                lineWidth: 1.2,
                fillOpacity: 1,
              },
              name: "rect-shape",
            });
            group.addShape("circle", {
              attrs: {
                x: -width / 2,
                y: 0,
                r: 3,
                fill: stroke,
              },
              name: "circle-shape",
            });
            group.addShape("circle", {
              attrs: {
                x: width / 2,
                y: 0,
                r: 3,
                fill: stroke,
              },
              name: "circle-shape2",
            });
            group.addShape("image", {
              attrs: {
                x: width / 2 - 30,
                y: -8,
                height: 16,
                width: 16,
                cursor: "pointer",
                img:
                  "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
              },
              name: "node-icon",
            });
            return rect;
          },
          getAnchorPoints: function getAnchorPoints() {
            return [
              [0, 0.5],
              [1, 0.5],
            ];
          },
        },
        "single-node"
      );

      // 边
      G6.registerEdge("polyline", {
        itemType: "edge",
        draw: function draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;

          const Ydiff = endPoint.y - startPoint.y;

          const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

          const cpOffset = 16;
          const offset = Ydiff < 0 ? cpOffset : -cpOffset;

          const line1EndPoint = {
            x: startPoint.x + slope,
            y: endPoint.y + offset,
          };
          const line2StartPoint = {
            x: line1EndPoint.x + cpOffset,
            y: endPoint.y,
          };

          // 控制点坐标
          const controlPoint = {
            x:
              ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
                (line1EndPoint.y - startPoint.y) +
              startPoint.x,
            y: endPoint.y,
          };

          let path = [
            ["M", startPoint.x, startPoint.y],
            ["L", line1EndPoint.x, line1EndPoint.y],
            [
              "Q",
              controlPoint.x,
              controlPoint.y,
              line2StartPoint.x,
              line2StartPoint.y,
            ],
            ["L", endPoint.x, endPoint.y],
          ];

          if (Ydiff === 0) {
            path = [
              ["M", startPoint.x, startPoint.y],
              ["L", endPoint.x, endPoint.y],
            ];
          }

          const line = group.addShape("path", {
            attrs: {
              path,
              stroke: "#1A91FF",
              lineWidth: 1.2,
              endArrow: false,
            },
            name: "path-shape",
          });

          const labelTopOffset = 8;
          // amount
          const amount = group.addShape("text", {
            attrs: {
              text: cfg.data && cfg.data.amount,
              x: line2StartPoint.x + 80,
              y: endPoint.y - labelTopOffset - 2,
              fontSize: 14,
              textAlign: "center",
              textBaseline: "middle",
              fill: "#000000D9",
              cursor: "pointer",
            },
            name: "text-shape-amount",
          });
          return line;
        },
      });
    },
  },
};
</script>

<style lang="scss">
</style>