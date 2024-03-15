package com.vev;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class BarcaTest {

    @Test
    public void ocupaLugarTest() {
        // Arrange
        Barca barca = new Barca();
        int resultado = barca.ocupaLugar("F02A12");

        // Act
        final int esperado = 3;

        // Assert
        assertEquals(esperado, resultado);
    }
}
