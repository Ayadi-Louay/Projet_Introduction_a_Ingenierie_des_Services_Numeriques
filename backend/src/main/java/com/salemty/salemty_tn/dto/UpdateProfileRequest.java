package com.salemty.salemty_tn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String city;
    private String governorate;
    private String postalCode;
    private String profilePicture;
}
