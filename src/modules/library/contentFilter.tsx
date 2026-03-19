import { Select } from "antd";
import { subjects, educationLevels } from "@/src/libs/helpers";

export default function ContentFilter({
    subject,
    setSubject,
    level,
    setLevel,
}: any) {

    return (
        <div className="flex gap-4">

            <Select
                value={subject}
                placeholder="All Subjects"
                style={{ width: 220 }}
                onChange={setSubject}
                options={[
                    { label: "All Subjects", value: "ALL" },
                    ...subjects,
                ]}
            />

            <Select
                value={level}
                placeholder="All Levels"
                style={{ width: 220 }}
                onChange={setLevel}
                options={[
                    { label: "All Levels", value: "ALL" },
                    ...educationLevels,
                ]}
            />

        </div>
    );
}