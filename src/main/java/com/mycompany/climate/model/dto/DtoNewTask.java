package com.mycompany.climate.model.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = DtoDeviceNewTextTask.class, name = "typeText"),
        @JsonSubTypes.Type(value = DtoDeviceNewTaskDouble.class, name = "typeDouble")
})
@Data
public class DtoNewTask {

    private String paramName;
}
