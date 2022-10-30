import Form from "react-bootstrap/Form";

function OptionRadio() {
    return (
        <Form>
        {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                    inline
                    label="즉시 구매 모드"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    checked
                />
                <Form.Check
                    inline
                    label="자세히 보기 모드"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                />
            </div>
        ))}
    </Form>
    );
}

export default OptionRadio