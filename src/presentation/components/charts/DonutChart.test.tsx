import { render } from "@testing-library/react-native";
import React from "react";
import { Circle } from "react-native-svg";
import { DonutChart } from "./DonutChart";

describe("DonutChart", () => {
  const mockData = [
    { name: "Item A", value: 50, color: "red" },
    { name: "Item B", value: 30, color: "blue" },
    { name: "Item C", value: 20, color: "green" },
  ];

  it("renderiza corretamente o container", () => {
    const { getByTestId } = render(
      <DonutChart data={mockData} testID="donut-chart" />
    );

    expect(getByTestId("donut-chart")).toBeTruthy();
  });

  it("renderiza um Circle para cada item válido de data", () => {
    const { UNSAFE_queryAllByType } = render(<DonutChart data={mockData} />);
    const circles = UNSAFE_queryAllByType(Circle);

    expect(circles).toHaveLength(3);
  });

  it("não renderiza Circle quando valor é 0", () => {
    const { UNSAFE_queryAllByType } = render(
      <DonutChart
        data={[
          { name: "Zero Item", value: 0, color: "red" },
          { name: "Valid Item", value: 10, color: "blue" },
        ]}
      />
    );

    const circles = UNSAFE_queryAllByType(Circle);
    expect(circles).toHaveLength(1); 
  });

  it("atribui cores corretas aos Circles", () => {
    const { UNSAFE_queryAllByType } = render(<DonutChart data={mockData} />);
    const circles = UNSAFE_queryAllByType(Circle);

    expect(circles[0].props.stroke).toBe("red");
    expect(circles[1].props.stroke).toBe("blue");
    expect(circles[2].props.stroke).toBe("green");
  });

  it("aplica strokeWidth corretamente", () => {
    const { UNSAFE_queryAllByType } = render(<DonutChart data={mockData} />);
    const circles = UNSAFE_queryAllByType(Circle);

    circles.forEach(circle => {
      expect(circle.props.strokeWidth).toBeGreaterThan(0);
    });
  });
});
