package com.javaguides.springboot;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;

public class LogReader {
    public static void main(String[] args) {
        // Putanja do log datoteke, koristeći relativnu putanju
        String logFilePath = Paths.get("app.log").toString();

        try (BufferedReader br = new BufferedReader(new FileReader(logFilePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Provjera linije loga za greške
                if (line.contains("ERROR") || line.contains("Exception")) {
                    System.out.println(line); // Ispisivanje linije loga s greškom
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
