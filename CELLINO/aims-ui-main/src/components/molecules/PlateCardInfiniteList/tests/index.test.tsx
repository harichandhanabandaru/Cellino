import { render } from "@testing-library/react";
import PlateCardInfiniteList from "../index";

const ITEM_SIZE = 125;

describe("plate card infinte lsi tests", () => {
  it("should match the palte card infinite list render", () => {
    const loadMoreItems = jest.fn();
    const { container } = render(
      <PlateCardInfiniteList
        data={[
          {
            currentPhaseId: "038afa29-6c07-4476-aacf-d1291833c66a",
            id: "8",
            plateName: "x1412",
            processStatus: "",
            runId: "8beb169a-f116-11ec-8ea0-0242ac120002",
          },
        ]}
        loadNextPage={loadMoreItems}
        totalElements={1}
        last={true}
        itemSize={ITEM_SIZE}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
