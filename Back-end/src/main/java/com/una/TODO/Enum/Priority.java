package com.una.TODO.Enum;

import lombok.Getter;

@Getter
public enum Priority {
    LOW(0),
    MEDIUM(1),
    HIGH(2);

    private final int level;

    Priority(int level){
        this.level = level;
    }
}
