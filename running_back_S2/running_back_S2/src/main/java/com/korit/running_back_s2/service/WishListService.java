package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.wishList.WishList;
import com.korit.running_back_s2.domain.wishList.WishListMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListService {

    private final WishListMapper wishListMapper;

    public List<WishList> getWishs (Integer userId) {
        return wishListMapper.getWishs(userId);
    }

    public void addWish(WishList wishList) {
        wishListMapper.insertWish(wishList);
    }

    public void removeWish(WishList wishList) {
        wishListMapper.deleteWish(wishList);
    }
}
